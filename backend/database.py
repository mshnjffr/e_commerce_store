"""Database setup and models for the laptop store API."""

import sqlite3
from contextlib import contextmanager
from typing import List, Optional
from datetime import datetime
import hashlib
import secrets


class DatabaseManager:
    """Manages database connections and operations."""
    
    def __init__(self, db_path: str = "laptop_store.db"):
        self.db_path = db_path
        self.init_database()
    
    @contextmanager
    def get_connection(self):
        """Context manager for database connections."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
        finally:
            conn.close()
    
    def init_database(self):
        """Initialize database tables."""
        with self.get_connection() as conn:
            # Create laptops table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS laptops (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    brand TEXT NOT NULL,
                    model TEXT NOT NULL,
                    processor TEXT NOT NULL,
                    ram_gb INTEGER NOT NULL,
                    storage_gb INTEGER NOT NULL,
                    graphics TEXT NOT NULL,
                    screen_size REAL NOT NULL,
                    price REAL NOT NULL,
                    stock_quantity INTEGER NOT NULL DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create mice table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS mice (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    brand TEXT NOT NULL,
                    model TEXT NOT NULL,
                    mouse_type TEXT NOT NULL,
                    connectivity TEXT NOT NULL,
                    dpi INTEGER NOT NULL,
                    buttons INTEGER NOT NULL,
                    rgb_lighting BOOLEAN NOT NULL DEFAULT FALSE,
                    weight_grams INTEGER NOT NULL,
                    price REAL NOT NULL,
                    stock_quantity INTEGER NOT NULL DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create users table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    salt TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create orders table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    total_amount REAL NOT NULL,
                    status TEXT NOT NULL DEFAULT 'pending',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )
            """)
            
            # Create order_items table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS order_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER NOT NULL,
                    laptop_id INTEGER,
                    mice_id INTEGER,
                    quantity INTEGER NOT NULL,
                    unit_price REAL NOT NULL,
                    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
                    FOREIGN KEY (laptop_id) REFERENCES laptops (id),
                    FOREIGN KEY (mice_id) REFERENCES mice (id),
                    CHECK ((laptop_id IS NOT NULL AND mice_id IS NULL) OR (laptop_id IS NULL AND mice_id IS NOT NULL))
                )
            """)
            
            conn.commit()
            self._populate_sample_data()
    
    def _populate_sample_data(self):
        """Populate database with sample laptops, mice, and users."""
        with self.get_connection() as conn:
            # Check if laptops already exist
            result = conn.execute("SELECT COUNT(*) FROM laptops").fetchone()
            if result[0] > 0:
                return
            
            # Insert sample laptops (latest 2024-2025 models)
            laptops = [
                ("Apple", "MacBook Pro 16-inch M4", "Apple M4 Pro", 18, 512, "Apple GPU", 16.2, 2499.00, 10),
                ("Dell", "XPS 13 Plus 9340", "Intel Core Ultra 7 155H", 16, 1000, "Intel Arc Graphics", 13.4, 1299.00, 15),
                ("Lenovo", "ThinkPad X1 Carbon Gen 12", "Intel Core Ultra 7 165U", 32, 1000, "Intel Graphics", 14.0, 1899.00, 8),
                ("HP", "Spectre x360 16", "Intel Core Ultra 7 155H", 16, 1000, "Intel Arc Graphics", 16.0, 1699.00, 12),
                ("ASUS", "ROG Zephyrus G16", "AMD Ryzen 9 8945HS", 32, 1000, "NVIDIA RTX 4070", 16.0, 2299.00, 6),
                ("Microsoft", "Surface Laptop Studio 2", "Intel Core i7-13700H", 32, 1000, "NVIDIA RTX 4060", 14.4, 2399.00, 7),
                ("Razer", "Blade 16", "Intel Core i9-14900HX", 32, 2000, "NVIDIA RTX 4080", 16.0, 3499.00, 4),
                ("Alienware", "m18 R2", "Intel Core i9-14900HX", 64, 2000, "NVIDIA RTX 4090", 18.0, 4299.00, 3),
                ("LG", "Gram 17", "Intel Core Ultra 7 155H", 16, 1000, "Intel Arc Graphics", 17.0, 1599.00, 9),
                ("Samsung", "Galaxy Book4 Ultra", "Intel Core Ultra 9 185H", 32, 1000, "NVIDIA RTX 4070", 16.0, 2399.00, 5)
            ]
            
            conn.executemany("""
                INSERT INTO laptops (brand, model, processor, ram_gb, storage_gb, graphics, screen_size, price, stock_quantity)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, laptops)
            
            # Insert sample computer mice (latest 2024-2025 models)
            mice = [
                ("Logitech", "G Pro X Superlight 2", "Gaming", "Wireless", 32000, 5, True, 60, 149.99, 20),
                ("Razer", "DeathAdder V3 Pro", "Gaming", "Wireless", 30000, 8, True, 90, 129.99, 15),
                ("SteelSeries", "Rival 650", "Gaming", "Wired", 12000, 7, True, 121, 79.99, 18),
                ("Corsair", "Dark Core RGB Pro SE", "Gaming", "Wireless", 18000, 8, True, 133, 89.99, 12),
                ("ASUS", "ROG Keris Wireless", "Gaming", "Wireless", 16000, 6, True, 79, 99.99, 14),
                ("HyperX", "Pulsefire Haste 2", "Gaming", "Wireless", 26000, 6, True, 59, 79.99, 16),
                ("Logitech", "MX Master 3S", "Productivity", "Wireless", 8000, 7, False, 141, 99.99, 25),
                ("Microsoft", "Surface Precision Mouse", "Productivity", "Bluetooth", 3200, 3, False, 135, 99.99, 22),
                ("Apple", "Magic Mouse", "Productivity", "Bluetooth", 1300, 2, False, 99, 79.00, 30),
                ("Razer", "Basilisk V3 Pro", "Gaming", "Wireless", 30000, 11, True, 112, 159.99, 10),
                ("Finalmouse", "UltralightX", "Gaming", "Wired", 25600, 5, False, 47, 189.99, 8),
                ("Glorious", "Model O 2 Wireless", "Gaming", "Wireless", 26000, 6, True, 63, 79.99, 19)
            ]
            
            conn.executemany("""
                INSERT INTO mice (brand, model, mouse_type, connectivity, dpi, buttons, rgb_lighting, weight_grams, price, stock_quantity)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, mice)
            
            # Create sample users
            users = [
                ("john_doe", "john@example.com", "password123"),
                ("jane_smith", "jane@example.com", "securepass456")
            ]
            
            for username, email, password in users:
                salt = secrets.token_hex(16)
                password_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
                conn.execute("""
                    INSERT INTO users (username, email, password_hash, salt)
                    VALUES (?, ?, ?, ?)
                """, (username, email, password_hash.hex(), salt))
            
            conn.commit()


# Initialize database on import
db_manager = DatabaseManager()
