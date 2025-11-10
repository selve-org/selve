"""
Authentication module for validating Clerk JWT tokens.

This module provides authentication dependencies for FastAPI routes,
allowing them to verify and extract user information from Clerk session tokens.
"""

import os
from typing import Optional
import httpx
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from functools import lru_cache
import logging

logger = logging.getLogger(__name__)

# Security scheme for Bearer tokens
security = HTTPBearer(auto_error=False)


class ClerkAuth:
    """Clerk authentication handler"""
    
    def __init__(self):
        self.clerk_domain = os.getenv("CLERK_DOMAIN")
        self.clerk_secret_key = os.getenv("CLERK_SECRET_KEY")
        
        if not self.clerk_domain:
            logger.warning("CLERK_DOMAIN not set - authentication will fail")
        if not self.clerk_secret_key:
            logger.warning("CLERK_SECRET_KEY not set - authentication will fail")
    
    @lru_cache(maxsize=1)
    async def get_jwks(self) -> dict:
        """
        Fetch Clerk's JWKS (JSON Web Key Set) for token verification.
        Cached to avoid repeated API calls.
        """
        if not self.clerk_domain:
            raise HTTPException(status_code=500, detail="Clerk domain not configured")
        
        jwks_url = f"https://{self.clerk_domain}/.well-known/jwks.json"
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(jwks_url)
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Failed to fetch JWKS: {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch authentication keys")
    
    async def verify_token(self, token: str) -> dict:
        """
        Verify Clerk JWT token and return decoded claims.
        
        Returns:
            dict with user claims including:
                - sub: Clerk user ID (e.g., "user_xxx")
                - email: User's email
                - first_name, last_name: User's name
                - session_id: Clerk session ID
        """
        if not self.clerk_domain:
            raise HTTPException(status_code=500, detail="Clerk domain not configured")
        
        try:
            # Decode header to get kid (key ID)
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get("kid")
            
            if not kid:
                raise HTTPException(status_code=401, detail="Invalid token: missing kid")
            
            # Get JWKS and find matching key
            jwks = await self.get_jwks()
            key = None
            for jwk in jwks.get("keys", []):
                if jwk.get("kid") == kid:
                    key = jwk
                    break
            
            if not key:
                raise HTTPException(status_code=401, detail="Invalid token: key not found")
            
            # Verify and decode token
            claims = jwt.decode(
                token,
                key,
                algorithms=["RS256"],
                options={
                    "verify_signature": True,
                    "verify_aud": False,  # Clerk tokens don't use aud
                    "verify_iss": True,
                    "verify_exp": True,
                }
            )
            
            return claims
            
        except JWTError as e:
            logger.error(f"JWT verification failed: {e}")
            raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
        except Exception as e:
            logger.error(f"Token verification error: {e}")
            raise HTTPException(status_code=401, detail="Authentication failed")


# Global auth instance
clerk_auth = ClerkAuth()


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Security(security)
) -> Optional[dict]:
    """
    FastAPI dependency to get current authenticated user.
    Returns None if no credentials provided (allows optional auth).
    Raises 401 if credentials are invalid.
    
    Usage:
        @router.get("/protected")
        async def protected_route(user: dict = Depends(get_current_user)):
            if not user:
                raise HTTPException(status_code=401, detail="Authentication required")
            clerk_id = user["sub"]
            email = user["email"]
            ...
    
    Usage (optional auth):
        @router.get("/optional-auth")
        async def optional_route(user: Optional[dict] = Depends(get_current_user)):
            if user:
                # Authenticated user
                clerk_id = user["sub"]
            else:
                # Anonymous user
                pass
    """
    if not credentials:
        return None
    
    token = credentials.credentials
    user_data = await clerk_auth.verify_token(token)
    
    return user_data


async def require_auth(
    user: Optional[dict] = Depends(get_current_user)
) -> dict:
    """
    FastAPI dependency that requires authentication.
    Use this for routes that must have an authenticated user.
    
    Usage:
        @router.get("/protected")
        async def protected_route(user: dict = Depends(require_auth)):
            clerk_id = user["sub"]
            email = user["email"]
            ...
    """
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user
