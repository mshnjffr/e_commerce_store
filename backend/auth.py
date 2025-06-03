"""Authentication and authorization utilities."""

import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from config import get_settings
from database import db_manager


security = HTTPBearer()
settings = get_settings()


class AuthService:
    """Service for handling authentication operations."""
    
    @staticmethod
    def hash_password(password: str, salt: str) -> str:
        """Hash password with salt using PBKDF2."""
        return hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000).hex()
    
    @staticmethod
    def verify_password(password: str, hashed_password: str, salt: str) -> bool:
        """Verify password against hash."""
        return secrets.compare_digest(
            AuthService.hash_password(password, salt),
            hashed_password
        )
    
    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token."""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
        return encoded_jwt
    
    @staticmethod
    def verify_token(token: str) -> dict:
        """Verify and decode JWT token."""
        try:
            payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
            return payload
        except jwt.JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    @staticmethod
    def authenticate_user(username: str, password: str) -> Optional[dict]:
        """Authenticate user with username and password."""
        with db_manager.get_connection() as conn:
            user = conn.execute(
                "SELECT id, username, email, password_hash, salt FROM users WHERE username = ?",
                (username,)
            ).fetchone()
            
            if not user:
                return None
            
            if not AuthService.verify_password(password, user['password_hash'], user['salt']):
                return None
            
            return {
                "id": user['id'],
                "username": user['username'],
                "email": user['email']
            }


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Get current authenticated user."""
    token = credentials.credentials
    payload = AuthService.verify_token(token)
    
    username: str = payload.get("sub")
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    with db_manager.get_connection() as conn:
        user = conn.execute(
            "SELECT id, username, email FROM users WHERE username = ?",
            (username,)
        ).fetchone()
        
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return {
            "id": user['id'],
            "username": user['username'],
            "email": user['email']
        }
