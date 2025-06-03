"""Business logic services for the laptop store API."""

import secrets
from typing import List, Optional
from datetime import datetime

from fastapi import HTTPException, status

from database import db_manager
from models import (
    LaptopResponse, MouseResponse, UserCreate, UserResponse, OrderCreate, 
    OrderResponse, OrderItemResponse, OrderUpdate
)
from auth import AuthService


class LaptopService:
    """Service for laptop-related operations."""
    
    @staticmethod
    def get_all_laptops() -> List[LaptopResponse]:
        """Get all laptops from database."""
        with db_manager.get_connection() as conn:
            rows = conn.execute("""
                SELECT id, brand, model, processor, ram_gb, storage_gb, 
                       graphics, screen_size, price, stock_quantity, created_at
                FROM laptops
                ORDER BY brand, model
            """).fetchall()
            
            return [LaptopResponse(**dict(row)) for row in rows]
    
    @staticmethod
    def get_laptop_by_id(laptop_id: int) -> Optional[LaptopResponse]:
        """Get laptop by ID."""
        with db_manager.get_connection() as conn:
            row = conn.execute("""
                SELECT id, brand, model, processor, ram_gb, storage_gb, 
                       graphics, screen_size, price, stock_quantity, created_at
                FROM laptops
                WHERE id = ?
            """, (laptop_id,)).fetchone()
            
            if row:
                return LaptopResponse(**dict(row))
            return None


class MouseService:
    """Service for mouse-related operations."""
    
    @staticmethod
    def get_all_mice() -> List[MouseResponse]:
        """Get all mice from database."""
        with db_manager.get_connection() as conn:
            rows = conn.execute("""
                SELECT id, brand, model, mouse_type, connectivity, dpi, 
                       buttons, rgb_lighting, weight_grams, price, stock_quantity, created_at
                FROM mice
                ORDER BY brand, model
            """).fetchall()
            
            return [MouseResponse(**dict(row)) for row in rows]
    
    @staticmethod
    def get_mouse_by_id(mouse_id: int) -> Optional[MouseResponse]:
        """Get mouse by ID."""
        with db_manager.get_connection() as conn:
            row = conn.execute("""
                SELECT id, brand, model, mouse_type, connectivity, dpi, 
                       buttons, rgb_lighting, weight_grams, price, stock_quantity, created_at
                FROM mice
                WHERE id = ?
            """, (mouse_id,)).fetchone()
            
            if row:
                return MouseResponse(**dict(row))
            return None


class UserService:
    """Service for user-related operations."""
    
    @staticmethod
    def create_user(user_data: UserCreate) -> UserResponse:
        """Create a new user."""
        with db_manager.get_connection() as conn:
            # Check if username or email already exists
            existing = conn.execute("""
                SELECT id FROM users 
                WHERE username = ? OR email = ?
            """, (user_data.username, user_data.email)).fetchone()
            
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username or email already registered"
                )
            
            # Create user with hashed password
            salt = secrets.token_hex(16)
            password_hash = AuthService.hash_password(user_data.password, salt)
            
            cursor = conn.execute("""
                INSERT INTO users (username, email, password_hash, salt)
                VALUES (?, ?, ?, ?)
            """, (user_data.username, user_data.email, password_hash, salt))
            
            conn.commit()
            
            # Get the created user
            user = conn.execute("""
                SELECT id, username, email, created_at
                FROM users WHERE id = ?
            """, (cursor.lastrowid,)).fetchone()
            
            return UserResponse(**dict(user))


class OrderService:
    """Service for order-related operations."""
    
    @staticmethod
    def create_order(user_id: int, order_data: OrderCreate) -> OrderResponse:
        """Create a new order."""
        with db_manager.get_connection() as conn:
            try:
                # Start transaction
                conn.execute("BEGIN")
                
                # Validate products and calculate total
                total_amount = 0
                order_items_data = []
                
                for item in order_data.items:
                    if item.laptop_id:
                        # Handle laptop item
                        product = conn.execute("""
                            SELECT id, price, stock_quantity
                            FROM laptops WHERE id = ?
                        """, (item.laptop_id,)).fetchone()
                        
                        if not product:
                            raise HTTPException(
                                status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Laptop with ID {item.laptop_id} not found"
                            )
                        
                        if product['stock_quantity'] < item.quantity:
                            raise HTTPException(
                                status_code=status.HTTP_400_BAD_REQUEST,
                                detail=f"Insufficient stock for laptop {item.laptop_id}"
                            )
                        
                        item_total = product['price'] * item.quantity
                        total_amount += item_total
                        
                        order_items_data.append({
                            'laptop_id': item.laptop_id,
                            'mice_id': None,
                            'quantity': item.quantity,
                            'unit_price': product['price'],
                            'product_type': 'laptop'
                        })
                        
                    elif item.mice_id:
                        # Handle mice item
                        product = conn.execute("""
                            SELECT id, price, stock_quantity
                            FROM mice WHERE id = ?
                        """, (item.mice_id,)).fetchone()
                        
                        if not product:
                            raise HTTPException(
                                status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Mouse with ID {item.mice_id} not found"
                            )
                        
                        if product['stock_quantity'] < item.quantity:
                            raise HTTPException(
                                status_code=status.HTTP_400_BAD_REQUEST,
                                detail=f"Insufficient stock for mouse {item.mice_id}"
                            )
                        
                        item_total = product['price'] * item.quantity
                        total_amount += item_total
                        
                        order_items_data.append({
                            'laptop_id': None,
                            'mice_id': item.mice_id,
                            'quantity': item.quantity,
                            'unit_price': product['price'],
                            'product_type': 'mice'
                        })
                
                # Create order
                cursor = conn.execute("""
                    INSERT INTO orders (user_id, total_amount, status)
                    VALUES (?, ?, 'pending')
                """, (user_id, total_amount))
                
                order_id = cursor.lastrowid
                
                # Create order items and update stock
                for item_data in order_items_data:
                    conn.execute("""
                        INSERT INTO order_items (order_id, laptop_id, mice_id, quantity, unit_price)
                        VALUES (?, ?, ?, ?, ?)
                    """, (order_id, item_data['laptop_id'], item_data['mice_id'], item_data['quantity'], item_data['unit_price']))
                    
                    # Update stock based on product type
                    if item_data['product_type'] == 'laptop':
                        conn.execute("""
                            UPDATE laptops 
                            SET stock_quantity = stock_quantity - ?
                            WHERE id = ?
                        """, (item_data['quantity'], item_data['laptop_id']))
                    elif item_data['product_type'] == 'mice':
                        conn.execute("""
                            UPDATE mice 
                            SET stock_quantity = stock_quantity - ?
                            WHERE id = ?
                        """, (item_data['quantity'], item_data['mice_id']))
                
                conn.commit()
                
                # Return created order
                return OrderService.get_order_by_id(order_id, user_id)
                
            except Exception as e:
                conn.rollback()
                if isinstance(e, HTTPException):
                    raise
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to create order"
                )
    
    @staticmethod
    def get_order_by_id(order_id: int, user_id: int) -> Optional[OrderResponse]:
        """Get order by ID for a specific user."""
        with db_manager.get_connection() as conn:
            # Get order
            order = conn.execute("""
                SELECT id, user_id, total_amount, status, created_at, updated_at
                FROM orders
                WHERE id = ? AND user_id = ?
            """, (order_id, user_id)).fetchone()
            
            if not order:
                return None
            
            # Get order items with product details
            items = conn.execute("""
                SELECT oi.id, oi.laptop_id, oi.mice_id, oi.quantity, oi.unit_price
                FROM order_items oi
                WHERE oi.order_id = ?
            """, (order_id,)).fetchall()
            
            order_items = []
            for item in items:
                laptop_data = None
                mice_data = None
                
                if item['laptop_id']:
                    # Get laptop details
                    laptop = conn.execute("""
                        SELECT id, brand, model, processor, ram_gb, storage_gb,
                               graphics, screen_size, price, stock_quantity, created_at
                        FROM laptops WHERE id = ?
                    """, (item['laptop_id'],)).fetchone()
                    
                    if laptop:
                        laptop_data = LaptopResponse(**dict(laptop))
                
                elif item['mice_id']:
                    # Get mice details
                    mouse = conn.execute("""
                        SELECT id, brand, model, mouse_type, connectivity, dpi,
                               buttons, rgb_lighting, weight_grams, price, stock_quantity, created_at
                        FROM mice WHERE id = ?
                    """, (item['mice_id'],)).fetchone()
                    
                    if mouse:
                        mice_data = MouseResponse(**dict(mouse))
                
                order_items.append(OrderItemResponse(
                    id=item['id'],
                    laptop_id=item['laptop_id'],
                    mice_id=item['mice_id'],
                    quantity=item['quantity'],
                    unit_price=item['unit_price'],
                    laptop=laptop_data,
                    mice=mice_data
                ))
            
            return OrderResponse(
                id=order['id'],
                user_id=order['user_id'],
                total_amount=order['total_amount'],
                status=order['status'],
                items=order_items,
                created_at=order['created_at'],
                updated_at=order['updated_at']
            )
    
    @staticmethod
    def get_user_orders(user_id: int) -> List[OrderResponse]:
        """Get all orders for a user."""
        with db_manager.get_connection() as conn:
            orders = conn.execute("""
                SELECT id FROM orders
                WHERE user_id = ?
                ORDER BY created_at DESC
            """, (user_id,)).fetchall()
            
            return [OrderService.get_order_by_id(order['id'], user_id) for order in orders]
    
    @staticmethod
    def update_order(order_id: int, user_id: int, order_update: OrderUpdate) -> OrderResponse:
        """Update an existing order."""
        with db_manager.get_connection() as conn:
            try:
                # Start transaction
                conn.execute("BEGIN")
                
                # Check if order exists and belongs to user
                existing_order = conn.execute("""
                    SELECT id, status FROM orders
                    WHERE id = ? AND user_id = ?
                """, (order_id, user_id)).fetchone()
                
                if not existing_order:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="Order not found"
                    )
                
                if existing_order['status'] != 'pending':
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Cannot modify order that is not pending"
                    )
                
                # Restore stock from existing order items
                existing_items = conn.execute("""
                    SELECT laptop_id, quantity FROM order_items
                    WHERE order_id = ?
                """, (order_id,)).fetchall()
                
                for item in existing_items:
                    conn.execute("""
                        UPDATE laptops 
                        SET stock_quantity = stock_quantity + ?
                        WHERE id = ?
                    """, (item['quantity'], item['laptop_id']))
                
                # Delete existing order items
                conn.execute("DELETE FROM order_items WHERE order_id = ?", (order_id,))
                
                # Validate new items and calculate total
                total_amount = 0
                order_items_data = []
                
                for item in order_update.items:
                    laptop = conn.execute("""
                        SELECT id, price, stock_quantity
                        FROM laptops WHERE id = ?
                    """, (item.laptop_id,)).fetchone()
                    
                    if not laptop:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Laptop with ID {item.laptop_id} not found"
                        )
                    
                    if laptop['stock_quantity'] < item.quantity:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Insufficient stock for laptop {item.laptop_id}"
                        )
                    
                    item_total = laptop['price'] * item.quantity
                    total_amount += item_total
                    
                    order_items_data.append({
                        'laptop_id': item.laptop_id,
                        'quantity': item.quantity,
                        'unit_price': laptop['price']
                    })
                
                # Update order
                conn.execute("""
                    UPDATE orders 
                    SET total_amount = ?, updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?
                """, (total_amount, order_id))
                
                # Create new order items and update stock
                for item_data in order_items_data:
                    conn.execute("""
                        INSERT INTO order_items (order_id, laptop_id, quantity, unit_price)
                        VALUES (?, ?, ?, ?)
                    """, (order_id, item_data['laptop_id'], item_data['quantity'], item_data['unit_price']))
                    
                    # Update laptop stock
                    conn.execute("""
                        UPDATE laptops 
                        SET stock_quantity = stock_quantity - ?
                        WHERE id = ?
                    """, (item_data['quantity'], item_data['laptop_id']))
                
                conn.commit()
                
                # Return updated order
                return OrderService.get_order_by_id(order_id, user_id)
                
            except Exception as e:
                conn.rollback()
                if isinstance(e, HTTPException):
                    raise
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to update order"
                )
    
    @staticmethod
    def delete_order(order_id: int, user_id: int) -> bool:
        """Delete an order."""
        with db_manager.get_connection() as conn:
            try:
                # Start transaction
                conn.execute("BEGIN")
                
                # Check if order exists and belongs to user
                existing_order = conn.execute("""
                    SELECT id, status FROM orders
                    WHERE id = ? AND user_id = ?
                """, (order_id, user_id)).fetchone()
                
                if not existing_order:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="Order not found"
                    )
                
                if existing_order['status'] != 'pending':
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Cannot delete order that is not pending"
                    )
                
                # Restore stock from order items
                existing_items = conn.execute("""
                    SELECT laptop_id, quantity FROM order_items
                    WHERE order_id = ?
                """, (order_id,)).fetchall()
                
                for item in existing_items:
                    conn.execute("""
                        UPDATE laptops 
                        SET stock_quantity = stock_quantity + ?
                        WHERE id = ?
                    """, (item['quantity'], item['laptop_id']))
                
                # Delete order (order_items will be deleted due to CASCADE)
                conn.execute("DELETE FROM orders WHERE id = ?", (order_id,))
                
                conn.commit()
                return True
                
            except Exception as e:
                conn.rollback()
                if isinstance(e, HTTPException):
                    raise
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to delete order"
                )
