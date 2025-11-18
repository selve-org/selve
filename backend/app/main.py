"""
SELVE Backend - FastAPI Application
Main entry point for the psychology profiling backend
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import questions, assessment, invites

app = FastAPI(
    title="SELVE Psychology API",
    description="Backend for adaptive questionnaire and personality profiling",
    version="0.1.0",
)

# CORS configuration - Allow Next.js frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "http://localhost:3001",  # Alternative port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(questions.router, prefix="/api", tags=["questions"])
app.include_router(assessment.router, prefix="/api", tags=["assessment"])
app.include_router(invites.router, prefix="/api", tags=["invites"])


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
