-- Inicialización de la base de datos para el sistema de categorías y productos

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS test;
USE test;

-- Las tablas se crearán automáticamente por Spring Boot JPA
-- Este archivo está aquí para futuras inicializaciones si se necesitan

-- Categorías de ejemplo (opcional - comentado para permitir que Spring Boot maneje)
-- INSERT IGNORE INTO categories (id, name, description) VALUES 
-- (1, 'Electrónicos', 'Dispositivos electrónicos y gadgets'),
-- (2, 'Ropa', 'Vestimenta y accesorios'),
-- (3, 'Hogar', 'Artículos para el hogar');

-- Productos de ejemplo (opcional - comentado)
-- INSERT IGNORE INTO products (id, name, description, price, category_id) VALUES 
-- (1, 'Smartphone', 'Teléfono inteligente última generación', 599.99, 1),
-- (2, 'Laptop', 'Computadora portátil para trabajo', 899.99, 1),
-- (3, 'Camiseta', 'Camiseta de algodón', 19.99, 2);
