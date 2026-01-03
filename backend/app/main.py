"""
SELVE Backend - FastAPI Application
Main entry point for the psychology profiling backend
"""

import os
import asyncio
import logging
import re
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.logging import LoggingIntegration
from app.db import prisma
from app.routes.assessment import router as assessment_router
from app.api.routes import invites, notifications, testimonials, newsletter, stats
from app.api.routes.users import router as users_router, webhooks_router
from app.logging_config import setup_logging
from app.middleware.request_logging import RequestLoggingMiddleware

# Setup production logging with PII scrubbing and file rotation
setup_logging(app_name="selve-backend")
logger = logging.getLogger(__name__)


def scrub_financial_data(text: str) -> str:
    """Replace financial amounts in text with masked values"""
    if not isinstance(text, str):
        return text
    # Replace $X.XX with $X.XX (masked)
    return re.sub(r'\$\d+\.\d+', '$X.XX', text)


def scrub_pii_from_event(event, hint):
    """
    Remove PII from Sentry events before sending

    Scrubs:
    - User emails
    - Financial data (costs, amounts)
    - Sensitive request data (passwords, tokens, etc.)
    """
    # Scrub user emails
    if "user" in event and "email" in event["user"]:
        event["user"]["email"] = "***@***.***"

    # Scrub financial data from exception messages
    if "exception" in event:
        for exc in event["exception"].get("values", []):
            if "value" in exc:
                exc["value"] = scrub_financial_data(exc["value"])

    # Scrub request data
    if "request" in event:
        if "data" in event["request"]:
            data = event["request"]["data"]
            if isinstance(data, dict):
                # Remove sensitive fields
                for key in ["password", "token", "credit_card", "ssn", "api_key"]:
                    if key in data:
                        data[key] = "[REDACTED]"

    # Scrub message
    if "message" in event:
        event["message"] = scrub_financial_data(event["message"])

    return event


def validate_required_environment_variables():
    """
    Validate that all critical environment variables are present at startup

    Fails loudly with RuntimeError if any required variables are missing.
    This prevents the application from starting in an invalid state.
    """
    required_vars = {
        "DATABASE_URL": "Database connection string",
        "CLERK_WEBHOOK_SECRET": "Clerk webhook signature verification",
    }

    missing = []
    for var_name, description in required_vars.items():
        if not os.getenv(var_name):
            missing.append(f"  • {var_name}: {description}")

    if missing:
        error_msg = (
            "\n❌ STARTUP VALIDATION FAILED\n"
            "\nMissing required environment variables:\n" +
            "\n".join(missing) +
            "\n\nApplication cannot start without these variables.\n"
            "Please check your .env file or environment configuration.\n"
        )
        logger.critical(error_msg)
        raise RuntimeError(error_msg)

    logger.info("✅ All required environment variables present")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager
    Handles startup and shutdown events
    """
    # Startup
    environment = os.getenv('ENVIRONMENT', 'development')
    print(f"🚀 Starting SELVE Backend ({environment})...")
    
    # Auto-select configuration based on environment
    if environment == 'production':
        # Production: Use live database, Clerk keys, and OpenAI key
        db_url = os.getenv('DATABASE_URL_PROD')
        clerk_domain = os.getenv('CLERK_DOMAIN_PROD')
        clerk_secret = os.getenv('CLERK_SECRET_KEY_PROD')
        clerk_webhook = os.getenv('CLERK_WEBHOOK_SECRET_PROD')
        openai_key = os.getenv('OPENAI_API_KEY_PROD')
        
        if db_url:
            os.environ['DATABASE_URL'] = db_url
        if clerk_domain:
            os.environ['CLERK_DOMAIN'] = clerk_domain
        if clerk_secret:
            os.environ['CLERK_SECRET_KEY'] = clerk_secret
        if clerk_webhook:
            os.environ['CLERK_WEBHOOK_SECRET'] = clerk_webhook
        if openai_key:
            os.environ['OPENAI_API_KEY'] = openai_key
            
        print("📊 Using production database (ep-still-block)")
        print("🔐 Using production Clerk keys (clerk.selve.me)")
        print("🤖 Using production OpenAI key")
    else:
        # Development: Use dev database, test Clerk keys, and dev OpenAI key
        db_url = os.getenv('DATABASE_URL_DEV')
        clerk_domain = os.getenv('CLERK_DOMAIN_DEV')
        clerk_secret = os.getenv('CLERK_SECRET_KEY_DEV')
        clerk_webhook = os.getenv('CLERK_WEBHOOK_SECRET_DEV')
        openai_key = os.getenv('OPENAI_API_KEY_DEV')
        
        if db_url:
            os.environ['DATABASE_URL'] = db_url
        if clerk_domain:
            os.environ['CLERK_DOMAIN'] = clerk_domain
        if clerk_secret:
            os.environ['CLERK_SECRET_KEY'] = clerk_secret
        if clerk_webhook:
            os.environ['CLERK_WEBHOOK_SECRET'] = clerk_webhook
        if openai_key:
            os.environ['OPENAI_API_KEY'] = openai_key
            
        print("📊 Using development database (ep-rapid-band)")
        print("🔐 Using development Clerk keys (pretty-boxer-70)")
        print("🤖 Using development OpenAI key")

    # Validate required environment variables BEFORE proceeding
    # This ensures we fail fast if critical configuration is missing
    validate_required_environment_variables()

    # Initialize Sentry for error tracking (production only)
    sentry_dsn = os.getenv("SENTRY_DSN")
    if sentry_dsn and environment == "production":
        sentry_sdk.init(
            dsn=sentry_dsn,
            environment=environment,
            integrations=[
                FastApiIntegration(transaction_style="endpoint"),
                LoggingIntegration(
                    level=logging.INFO,
                    event_level=logging.ERROR
                ),
            ],
            traces_sample_rate=0.1,  # 10% of transactions for performance monitoring
            profiles_sample_rate=0.1,  # 10% profiling
            before_send=scrub_pii_from_event,
        )
        logger.info("✅ Sentry initialized for production error tracking")
    else:
        logger.info(f"ℹ️ Sentry disabled ({environment} mode or missing DSN)")

    # Connect to database with retries (Neon compute may need time to wake up)
    print("🔌 Connecting to database (this may take a moment if compute is waking up)...")
    max_retries = 3
    retry_delay = 5
    
    for attempt in range(1, max_retries + 1):
        try:
            await prisma.connect()
            print("✅ Connected to database")
            break
        except Exception as e:
            if attempt < max_retries:
                print(f"⚠️  Connection attempt {attempt} failed, retrying in {retry_delay}s...")
                await asyncio.sleep(retry_delay)
            else:
                print(f"❌ Failed to connect after {max_retries} attempts")
                raise

    yield

    # Shutdown
    print("🛑 Shutting down SELVE Backend...")
    await prisma.disconnect()
    print("✅ Disconnected from database")


app = FastAPI(
    title="SELVE Psychology API",
    description="Backend for adaptive questionnaire and personality profiling",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS configuration - Allow Next.js frontend to call this API
# Get CORS origins from environment variable
cors_origins_str = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
cors_origins = [origin.strip() for origin in cors_origins_str.split(',')]

# Restrict methods and headers to only what's needed for security (SEC-4)
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept", "X-Requested-With", "X-User-ID"],
)

# Request logging middleware with tracing
app.add_middleware(RequestLoggingMiddleware)


# Sentry user context middleware
@app.middleware("http")
async def add_sentry_context(request: Request, call_next):
    """Add user context to Sentry events"""
    user_id = request.headers.get("X-User-ID")
    if user_id:
        with sentry_sdk.configure_scope() as scope:
            # Truncate user ID for privacy (first 8 chars + ***)
            scope.set_user({"id": user_id[:8] + "***"})
            scope.set_tag("endpoint", request.url.path)

    response = await call_next(request)
    return response


# Include routers
app.include_router(assessment_router, prefix="/api", tags=["assessment"])
app.include_router(invites.router, prefix="/api", tags=["invites"])
app.include_router(notifications.router, prefix="/api", tags=["notifications"])
app.include_router(testimonials.router, prefix="/api", tags=["testimonials"])
app.include_router(newsletter.router, tags=["newsletter"])
app.include_router(stats.router, tags=["stats"])
app.include_router(users_router, prefix="/api", tags=["users"])
app.include_router(webhooks_router, prefix="/api", tags=["webhooks"])


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "SELVE Psychology API",
        "status": "running",
        "version": "0.1.0",
    }


@app.get("/health")
async def health_check():
    """Detailed health check with database status"""
    # TODO: Add database connection check
    return {
        "status": "healthy",
        "database": "connected",  # Placeholder
    }
