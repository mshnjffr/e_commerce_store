"""Main FastAPI application for the laptop store."""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from config import get_settings
from models import (
    LaptopResponse, MouseResponse, UserCreate, UserResponse, UserLogin, Token,
    OrderCreate, OrderResponse, OrderUpdate, MessageResponse
)
from services import LaptopService, MouseService, UserService, OrderService
from auth import AuthService, get_current_user

# Get settings
settings = get_settings()

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=settings.description,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/", response_model=MessageResponse)
async def root():
    """Root endpoint for health check."""
    return MessageResponse(message="Laptop Store API is running")


# Laptop endpoints
@app.get(
    f"{settings.api_prefix}/laptops", 
    response_model=List[LaptopResponse],
    summary="Get all laptops",
    description="Retrieve all available laptops from the inventory"
)
async def get_laptops():
    """Get all laptops."""
    return LaptopService.get_all_laptops()


@app.get(
    f"{settings.api_prefix}/laptops/{{laptop_id}}", 
    response_model=LaptopResponse,
    summary="Get laptop by ID",
    description="Retrieve a specific laptop by its ID"
)
async def get_laptop(laptop_id: int):
    """Get laptop by ID."""
    laptop = LaptopService.get_laptop_by_id(laptop_id)
    if not laptop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Laptop not found"
        )
    return laptop


# Mouse endpoints
@app.get(
    f"{settings.api_prefix}/mice", 
    response_model=List[MouseResponse],
    summary="Get all computer mice",
    description="Retrieve all available computer mice from the inventory"
)
async def get_mice():
    """Get all computer mice."""
    return MouseService.get_all_mice()


@app.get(
    f"{settings.api_prefix}/mice/{{mouse_id}}", 
    response_model=MouseResponse,
    summary="Get mouse by ID",
    description="Retrieve a specific computer mouse by its ID"
)
async def get_mouse(mouse_id: int):
    """Get mouse by ID."""
    mouse = MouseService.get_mouse_by_id(mouse_id)
    if not mouse:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mouse not found"
        )
    return mouse


# User endpoints
@app.post(
    f"{settings.api_prefix}/users/register", 
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Create a new user account"
)
async def register_user(user_data: UserCreate):
    """Register a new user."""
    return UserService.create_user(user_data)


@app.post(
    f"{settings.api_prefix}/users/login", 
    response_model=Token,
    summary="User login",
    description="Authenticate user and return access token"
)
async def login(login_data: UserLogin):
    """Authenticate user and return token."""
    user = AuthService.authenticate_user(login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = AuthService.create_access_token(data={"sub": user["username"]})
    return Token(access_token=access_token)


# Order endpoints
@app.post(
    f"{settings.api_prefix}/orders", 
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new order",
    description="Create a new order for the authenticated user"
)
async def create_order(
    order_data: OrderCreate, 
    current_user: dict = Depends(get_current_user)
):
    """Create a new order."""
    return OrderService.create_order(current_user["id"], order_data)


@app.get(
    f"{settings.api_prefix}/orders", 
    response_model=List[OrderResponse],
    summary="Get user orders",
    description="Retrieve all orders for the authenticated user"
)
async def get_user_orders(current_user: dict = Depends(get_current_user)):
    """Get all orders for the current user."""
    return OrderService.get_user_orders(current_user["id"])


@app.get(
    f"{settings.api_prefix}/orders/{{order_id}}", 
    response_model=OrderResponse,
    summary="Get order by ID",
    description="Retrieve a specific order by its ID"
)
async def get_order(
    order_id: int, 
    current_user: dict = Depends(get_current_user)
):
    """Get order by ID."""
    order = OrderService.get_order_by_id(order_id, current_user["id"])
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    return order


@app.put(
    f"{settings.api_prefix}/orders/{{order_id}}", 
    response_model=OrderResponse,
    summary="Update an order",
    description="Update an existing order (only pending orders can be modified)"
)
async def update_order(
    order_id: int, 
    order_update: OrderUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update an existing order."""
    return OrderService.update_order(order_id, current_user["id"], order_update)


@app.delete(
    f"{settings.api_prefix}/orders/{{order_id}}", 
    response_model=MessageResponse,
    summary="Delete an order",
    description="Delete an existing order (only pending orders can be deleted)"
)
async def delete_order(
    order_id: int, 
    current_user: dict = Depends(get_current_user)
):
    """Delete an order."""
    OrderService.delete_order(order_id, current_user["id"])
    return MessageResponse(message="Order deleted successfully")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
