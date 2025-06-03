"""Pydantic models for request/response validation."""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator


class LaptopBase(BaseModel):
    """Base laptop model."""
    brand: str = Field(..., min_length=1, max_length=50)
    model: str = Field(..., min_length=1, max_length=100)
    processor: str = Field(..., min_length=1, max_length=100)
    ram_gb: int = Field(..., ge=1, le=128)
    storage_gb: int = Field(..., ge=1, le=8192)
    graphics: str = Field(..., min_length=1, max_length=100)
    screen_size: float = Field(..., ge=10.0, le=20.0)
    price: float = Field(..., ge=0.01)
    stock_quantity: int = Field(..., ge=0)


class LaptopCreate(LaptopBase):
    """Model for creating a laptop."""
    pass


class LaptopResponse(LaptopBase):
    """Model for laptop responses."""
    id: int
    created_at: datetime
    
    model_config = {"from_attributes": True}


class MouseBase(BaseModel):
    """Base mouse model."""
    brand: str = Field(..., min_length=1, max_length=50)
    model: str = Field(..., min_length=1, max_length=100)
    mouse_type: str = Field(..., min_length=1, max_length=50)  # Gaming, Office, Ergonomic, etc.
    connectivity: str = Field(..., min_length=1, max_length=50)  # Wired, Wireless, Bluetooth
    dpi: int = Field(..., ge=400, le=35000)
    buttons: int = Field(..., ge=2, le=20)
    rgb_lighting: bool = Field(default=False)
    weight_grams: int = Field(..., ge=30, le=200)
    price: float = Field(..., ge=0.01)
    stock_quantity: int = Field(..., ge=0)


class MouseCreate(MouseBase):
    """Model for creating a mouse."""
    pass


class MouseResponse(MouseBase):
    """Model for mouse responses."""
    id: int
    created_at: datetime
    
    model_config = {"from_attributes": True}


class UserBase(BaseModel):
    """Base user model."""
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr


class UserCreate(UserBase):
    """Model for user registration."""
    password: str = Field(..., min_length=6, max_length=100)


class UserResponse(UserBase):
    """Model for user responses."""
    id: int
    created_at: datetime
    
    model_config = {"from_attributes": True}


class UserLogin(BaseModel):
    """Model for user login."""
    username: str
    password: str


class Token(BaseModel):
    """Model for authentication token."""
    access_token: str
    token_type: str = "bearer"


class OrderItemBase(BaseModel):
    """Base order item model."""
    laptop_id: Optional[int] = Field(None, ge=1)
    mice_id: Optional[int] = Field(None, ge=1)
    quantity: int = Field(..., ge=1, le=100)
    
    @model_validator(mode='after')
    def validate_product_ids(self):
        """Ensure exactly one product ID is provided."""
        laptop_id = self.laptop_id
        mice_id = self.mice_id
        
        # Check that exactly one ID is provided
        if not laptop_id and not mice_id:
            raise ValueError('Either laptop_id or mice_id must be provided')
        if laptop_id and mice_id:
            raise ValueError('Cannot specify both laptop_id and mice_id')
        return self


class OrderItemCreate(OrderItemBase):
    """Model for creating order items."""
    pass


class OrderItemResponse(OrderItemBase):
    """Model for order item responses."""
    id: int
    unit_price: float
    laptop: Optional[LaptopResponse] = None
    mice: Optional[MouseResponse] = None
    
    model_config = {"from_attributes": True}


class OrderBase(BaseModel):
    """Base order model."""
    items: List[OrderItemCreate] = Field(..., min_length=1)


class OrderCreate(OrderBase):
    """Model for creating orders."""
    pass


class OrderUpdate(BaseModel):
    """Model for updating orders."""
    items: List[OrderItemCreate] = Field(..., min_length=1)


class OrderResponse(BaseModel):
    """Model for order responses."""
    id: int
    user_id: int
    total_amount: float
    status: str
    items: List[OrderItemResponse]
    created_at: datetime
    updated_at: datetime
    
    model_config = {"from_attributes": True}


class MessageResponse(BaseModel):
    """Model for simple message responses."""
    message: str


class ErrorResponse(BaseModel):
    """Model for error responses."""
    detail: str
