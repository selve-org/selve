"""
SELVE Backend - FastAPI Application
Main entry point for the psychology profiling backend
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import prisma
from app.api.routes import questions, assessment, invites
from app.api.routes.users import router as users_router, webhooks_router


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
    
    await prisma.connect()
    print("✅ Connected to database")

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(questions.router, prefix="/api", tags=["questions"])
app.include_router(assessment.router, prefix="/api", tags=["assessment"])
app.include_router(invites.router, prefix="/api", tags=["invites"])
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
