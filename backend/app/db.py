"""
Shared Prisma client instance

This module provides a single Prisma client that is connected during
app startup and shared across all route handlers and services.

Usage:
    from app.db import prisma

    user = await prisma.user.find_unique(where={"id": user_id})
"""

from prisma import Prisma

# Global Prisma client instance
# This will be connected in main.py during app startup
prisma = Prisma()
