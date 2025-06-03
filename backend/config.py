"""Configuration settings for the laptop store API."""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings."""
    
    app_name: str = "Laptop Store API"
    app_version: str = "1.0.0"
    description: str = "A FastAPI application for managing laptop inventory and orders"
    
    # Database
    database_url: str = "laptop_store.db"
    
    # Security
    secret_key: str = "your-secret-key-change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # API
    api_prefix: str = "/api/v1"
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
