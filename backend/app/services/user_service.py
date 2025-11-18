"""
User Service - Manage user operations and profile updates

This service handles:
- User sync from Clerk (create/update)
- Profile creation and updates
- User deletion (cascading)
- Clerk webhook event processing
"""

from datetime import datetime
from typing import Optional, Dict, Any
from prisma import Prisma
from prisma.errors import PrismaError
from fastapi import HTTPException


class UserService:
    """Service for managing users and profiles"""

    def __init__(self, db: Prisma):
        """
        Initialize UserService

        Args:
            db: Prisma database client
        """
        self.db = db

    async def sync_user_from_clerk(
        self,
        clerk_id: str,
        email: str,
        name: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Sync user from Clerk to database (idempotent)

        Args:
            clerk_id: Clerk user ID
            email: User's email address
            name: User's full name (optional)

        Returns:
            Dictionary with user data and success status
        """
        try:
            # Check if user already exists
            existing = await self.db.user.find_unique(
                where={"clerkId": clerk_id}
            )

            if existing:
                return {
                    "success": True,
                    "user": existing,
                    "created": False
                }

            # Create new user
            user = await self.db.user.create(
                data={
                    "clerkId": clerk_id,
                    "email": email,
                    "name": name or None,
                }
            )

            return {
                "success": True,
                "user": user,
                "created": True
            }

        except PrismaError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Database error syncing user: {str(e)}"
            )

    async def get_user_profile(self, clerk_id: str) -> Optional[Dict[str, Any]]:
        """
        Get user profile by Clerk ID

        Args:
            clerk_id: Clerk user ID

        Returns:
            User data with profile, or None if not found
        """
        try:
            user = await self.db.user.find_unique(
                where={"clerkId": clerk_id},
                include={"profile": True}
            )

            if not user:
                return None

            return {
                "id": user.id,
                "clerkId": user.clerkId,
                "email": user.email,
                "name": user.name,
                "createdAt": user.createdAt,
                "profile": user.profile if user.profile else None
            }

        except PrismaError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Database error fetching profile: {str(e)}"
            )

    async def update_user_profile(
        self,
        clerk_id: str,
        demographics: Dict[str, Any],
        scores: Dict[str, float],
        narrative: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Update user profile after assessment completion

        Args:
            clerk_id: Clerk user ID
            demographics: Demographic data (name, age, gender, country, dob)
            scores: Personality dimension scores
            narrative: Generated narrative content

        Returns:
            Updated profile data
        """
        try:
            # Find user
            user = await self.db.user.find_unique(
                where={"clerkId": clerk_id},
                include={"profile": True}
            )

            if not user:
                raise HTTPException(
                    status_code=404,
                    detail="User not found"
                )

            # Calculate age from date of birth if provided
            age: Optional[int] = None
            if demographics.get("demo_dob"):
                birth_date = datetime.fromisoformat(
                    demographics["demo_dob"].replace("Z", "+00:00")
                )
                today = datetime.utcnow()
                age = today.year - birth_date.year
                month_diff = today.month - birth_date.month
                if month_diff < 0 or (month_diff == 0 and today.day < birth_date.day):
                    age -= 1

            # Update User.name if it's empty or placeholder
            demographic_name = demographics.get("demo_name")
            should_update_name = (
                not user.name or
                user.name == "null null" or
                user.name.strip() == ""
            )

            if demographic_name and should_update_name:
                await self.db.user.update(
                    where={"id": user.id},
                    data={"name": demographic_name}
                )

            # Build bio from demographics
            bio_parts = []
            if age:
                bio_parts.append(f"{age} years old")

            demo_gender = demographics.get("demo_gender")
            if demo_gender and demo_gender != "prefer_not_to_say":
                bio_parts.append(demo_gender)

            demo_country = demographics.get("demo_country")
            if demo_country:
                bio_parts.append(f"from {demo_country}")

            bio = ", ".join(bio_parts) if bio_parts else None

            # Prepare personality data
            personality_data = {
                "scores": scores,
                "narrative": narrative,
                "completedAt": datetime.utcnow().isoformat(),
                "demographics": {
                    "age": age,
                    "gender": demo_gender,
                    "country": demo_country,
                }
            }

            # Create or update Profile
            profile = await self.db.profile.upsert(
                where={"userId": user.id},
                data={
                    "create": {
                        "userId": user.id,
                        "bio": bio,
                        "personality": personality_data,
                    },
                    "update": {
                        "bio": bio,
                        "personality": personality_data,
                    }
                }
            )

            return {
                "success": True,
                "profile": {
                    "id": profile.id,
                    "bio": profile.bio,
                    "hasPersonality": True,
                }
            }

        except HTTPException:
            raise
        except PrismaError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Database error updating profile: {str(e)}"
            )

    async def handle_user_created(
        self,
        clerk_id: str,
        email: str,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        image_url: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Handle user.created webhook from Clerk

        Args:
            clerk_id: Clerk user ID
            email: User's email address
            first_name: User's first name
            last_name: User's last name
            image_url: User's avatar URL

        Returns:
            Created user data
        """
        try:
            # Build full name
            name_parts = [first_name, last_name]
            name = " ".join([part for part in name_parts if part]) or None

            # Use upsert to make this idempotent (handle duplicate webhooks)
            user = await self.db.user.upsert(
                where={"clerkId": clerk_id},
                data={
                    "create": {
                        "clerkId": clerk_id,
                        "email": email,
                        "name": name,
                        "profile": {
                            "create": {
                                "avatarUrl": image_url or None,
                            }
                        }
                    },
                    "update": {
                        "email": email,
                        "name": name,
                    }
                }
            )

            return {
                "success": True,
                "user": user,
                "action": "created"
            }

        except PrismaError as e:
            # Handle duplicate key errors gracefully (webhook retries)
            if "Unique constraint" in str(e) or "P2002" in str(e):
                return {
                    "success": True,
                    "message": "User already exists",
                    "action": "already_exists"
                }
            raise HTTPException(
                status_code=500,
                detail=f"Database error creating user: {str(e)}"
            )

    async def handle_user_updated(
        self,
        clerk_id: str,
        email: str,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        image_url: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Handle user.updated webhook from Clerk

        Args:
            clerk_id: Clerk user ID
            email: User's email address
            first_name: User's first name
            last_name: User's last name
            image_url: User's avatar URL

        Returns:
            Updated user data
        """
        try:
            # Build full name
            name_parts = [first_name, last_name]
            name = " ".join([part for part in name_parts if part]) or None

            # Update user and profile
            user = await self.db.user.update(
                where={"clerkId": clerk_id},
                data={
                    "email": email,
                    "name": name,
                    "profile": {
                        "upsert": {
                            "create": {
                                "avatarUrl": image_url or None,
                            },
                            "update": {
                                "avatarUrl": image_url or None,
                            }
                        }
                    }
                }
            )

            return {
                "success": True,
                "user": user,
                "action": "updated"
            }

        except PrismaError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Database error updating user: {str(e)}"
            )

    async def handle_user_deleted(self, clerk_id: str) -> Dict[str, Any]:
        """
        Handle user.deleted webhook from Clerk

        Args:
            clerk_id: Clerk user ID

        Returns:
            Deletion confirmation
        """
        try:
            # Delete user (cascade will handle profile, invites, etc.)
            await self.db.user.delete(
                where={"clerkId": clerk_id}
            )

            return {
                "success": True,
                "action": "deleted",
                "clerkId": clerk_id
            }

        except PrismaError as e:
            # If user doesn't exist, consider it a success (idempotent)
            if "Record to delete does not exist" in str(e):
                return {
                    "success": True,
                    "action": "already_deleted",
                    "clerkId": clerk_id
                }
            raise HTTPException(
                status_code=500,
                detail=f"Database error deleting user: {str(e)}"
            )
