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
    print("🚀 Starting SELVE Backend...")
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
