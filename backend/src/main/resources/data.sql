-- Insert sample users (passwords are encoded with BCrypt)
-- password123 -> $2a$10$E6UqjzBKOqFRGmJr.FxdOOJy5y9oo/Uw5hnGxS9Xw6PbLKCOJBYcO
-- securepass456 -> $2a$10$cLp4YNQhYQQRfR7FyIR8AuO3Mhj.GhAjOhHtDfvOE7VsRzL9W8Kx.
INSERT INTO users (username, email, password_hash, created_at) VALUES
('john_doe', 'john@example.com', '$2a$10$E6UqjzBKOqFRGmJr.FxdOOJy5y9oo/Uw5hnGxS9Xw6PbLKCOJBYcO', '2024-01-15 10:30:00'),
('jane_smith', 'jane@example.com', '$2a$10$cLp4YNQhYQQRfR7FyIR8AuO3Mhj.GhAjOhHtDfvOE7VsRzL9W8Kx.', '2024-01-16 14:20:00');

-- Insert laptops (Latest 2024-2025 Models)
INSERT INTO laptops (brand, model, processor, ram_gb, storage_gb, graphics, screen_size, price, stock_quantity, created_at) VALUES
('Apple', 'MacBook Pro 16-inch M4', 'Apple M4 Pro', 32, 1024, 'Apple M4 Pro GPU', 16.2, 2999.99, 15, '2024-01-15 10:30:00'),
('Dell', 'XPS 15 9530', 'Intel Core i7-13700H', 32, 1024, 'NVIDIA RTX 4070', 15.6, 2499.99, 12, '2024-01-15 10:30:00'),
('Lenovo', 'ThinkPad X1 Carbon Gen 11', 'Intel Core i7-1365U', 16, 512, 'Intel Iris Xe Graphics', 14.0, 1899.99, 20, '2024-01-15 10:30:00'),
('HP', 'Spectre x360 16', 'Intel Core i7-13700H', 16, 1024, 'Intel Arc A370M', 16.0, 1799.99, 8, '2024-01-15 10:30:00'),
('ASUS', 'ROG Zephyrus G16', 'AMD Ryzen 9 7940HS', 32, 1024, 'NVIDIA RTX 4080', 16.0, 2799.99, 10, '2024-01-15 10:30:00'),
('Microsoft', 'Surface Laptop Studio 2', 'Intel Core i7-13700H', 32, 1024, 'NVIDIA RTX 4060', 14.4, 2399.99, 6, '2024-01-15 10:30:00'),
('Razer', 'Blade 15 Advanced', 'Intel Core i9-13950HX', 32, 1024, 'NVIDIA RTX 4080', 15.6, 3199.99, 5, '2024-01-15 10:30:00'),
('Alienware', 'x16 R1', 'Intel Core i9-13900HX', 32, 2048, 'NVIDIA RTX 4090', 16.0, 3999.99, 3, '2024-01-15 10:30:00'),
('LG', 'Gram 17', 'Intel Core i7-1360P', 16, 512, 'Intel Iris Xe Graphics', 17.0, 1499.99, 18, '2024-01-15 10:30:00'),
('Framework', 'Laptop 13 DIY Edition', 'Intel Core i7-1370P', 32, 1024, 'Intel Iris Xe Graphics', 13.5, 1799.99, 7, '2024-01-15 10:30:00');

-- Insert mice (Modern Gaming & Productivity)
INSERT INTO mice (brand, model, mouse_type, connectivity, dpi, buttons, rgb_lighting, weight_grams, price, stock_quantity, created_at) VALUES
('Logitech', 'MX Master 3S', 'Productivity', 'Wireless', 8000, 7, false, 141, 99.99, 25, '2024-01-15 10:30:00'),
('Razer', 'DeathAdder V3 Pro', 'Gaming', 'Wireless', 30000, 8, true, 88, 149.99, 20, '2024-01-15 10:30:00'),
('SteelSeries', 'Rival 650 Wireless', 'Gaming', 'Wireless', 12000, 7, true, 153, 129.99, 15, '2024-01-15 10:30:00'),
('Corsair', 'Dark Core RGB Pro SE', 'Gaming', 'Wireless', 18000, 8, true, 133, 89.99, 18, '2024-01-15 10:30:00'),
('Apple', 'Magic Mouse 3', 'Productivity', 'Bluetooth', 1600, 2, false, 99, 79.99, 30, '2024-01-15 10:30:00'),
('Microsoft', 'Surface Precision Mouse', 'Productivity', 'Bluetooth', 3200, 3, false, 135, 99.99, 22, '2024-01-15 10:30:00'),
('Hyperx', 'Pulsefire Haste 2', 'Gaming', 'Wired', 26000, 6, false, 61, 59.99, 35, '2024-01-15 10:30:00'),
('Glorious', 'Model O 2 Wireless', 'Gaming', 'Wireless', 26000, 6, true, 63, 79.99, 28, '2024-01-15 10:30:00'),
('Zowie', 'EC3-C', 'Gaming', 'Wired', 3200, 5, false, 70, 69.99, 24, '2024-01-15 10:30:00'),
('Roccat', 'Kone Pro Air', 'Gaming', 'Wireless', 19000, 6, true, 75, 119.99, 16, '2024-01-15 10:30:00'),
('Finalmouse', 'UltralightX', 'Gaming', 'Wired', 16000, 6, false, 47, 189.99, 8, '2024-01-15 10:30:00'),
('Endgame Gear', 'OP1 8K', 'Gaming', 'Wired', 26000, 6, false, 58, 89.99, 12, '2024-01-15 10:30:00');
