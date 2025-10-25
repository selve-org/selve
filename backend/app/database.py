"""
Database configuration and session management
Connects to Neon PostgreSQL using SQLAlchemy async
"""

import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get database URL from environment (same as Next.js uses)
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set")

# Convert postgres:// to postgresql+asyncpg:// for async SQLAlchemy
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Remove incompatible query parameters for asyncpg
# asyncpg doesn't support sslmode/channel_binding - it uses ssl=require instead
if "?" in DATABASE_URL:
    base_url, params = DATABASE_URL.split("?", 1)
    # Remove sslmode and channel_binding params
    param_pairs = [p for p in params.split("&") if not p.startswith(("sslmode=", "channel_binding="))]
    DATABASE_URL = f"{base_url}?{'&'.join(param_pairs)}" if param_pairs else base_url

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=False,  # Set to True for SQL query logging during development
    pool_pre_ping=True,  # Verify connections before using
    pool_size=5,
    max_overflow=10,
    connect_args={"ssl": "require"},  # Enable SSL for Neon
)

# Create async session factory
AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Base class for SQLAlchemy models (if we need ORM models later)
Base = declarative_base()


async def get_db() -> AsyncSession:
    """
    Dependency injection for database sessions
    Usage in FastAPI routes:
        async def my_route(db: AsyncSession = Depends(get_db)):
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
