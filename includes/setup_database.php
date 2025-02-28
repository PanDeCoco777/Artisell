<?php
// This file creates all necessary tables for the application

// Users table
$db->exec("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    region VARCHAR(100),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);");

// Products table
$db->exec("CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    region VARCHAR(100),
    medium VARCHAR(100),
    dimensions VARCHAR(100),
    year INT,
    is_featured BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);");

// Product images table
$db->exec("CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);");

// Orders table
$db->exec("CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    notes TEXT,
    subtotal DECIMAL(10,2) NOT NULL,
    shipping DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);");

// Order items table
$db->exec("CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);");

// Favorites table
$db->exec("CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(user_id, product_id)
);");

// Insert sample data
// Check if products table is empty
$stmt = $db->query("SELECT COUNT(*) as count FROM products");
$result = $stmt->fetch();

if ($result['count'] == 0) {
    // Insert sample products
    $products = [
        [
            'title' => 'Vibrant Filipino Landscape',
            'artist' => 'Maria Santos',
            'price' => 12500,
            'description' => 'A vibrant depiction of rural life in the Philippines, showcasing the lush landscapes and traditional farming methods. This artwork captures the essence of Filipino countryside with its rich colors and detailed brushwork.',
            'region' => 'Visayas',
            'medium' => 'Oil on Canvas',
            'dimensions' => '24 x 36 inches',
            'year' => 2023,
            'is_featured' => true
        ],
        [
            'title' => 'Urban Manila',
            'artist' => 'Juan Dela Cruz',
            'price' => 18500,
            'description' => 'A modern interpretation of Manila\'s urban landscape, blending traditional Filipino elements with contemporary city life.',
            'region' => 'Luzon',
            'medium' => 'Acrylic on Canvas',
            'dimensions' => '30 x 40 inches',
            'year' => 2022,
            'is_featured' => true
        ],
        [
            'title' => 'Coastal Dreams',
            'artist' => 'Ana Reyes',
            'price' => 12000,
            'description' => 'A serene portrayal of the beautiful coastal regions of Mindanao, capturing the tranquility of island life.',
            'region' => 'Mindanao',
            'medium' => 'Watercolor',
            'dimensions' => '18 x 24 inches',
            'year' => 2023,
            'is_featured' => true
        ],
        [
            'title' => 'Manila Bay Sunset',
            'artist' => 'Juan Reyes',
            'price' => 9800,
            'description' => 'A stunning sunset view over Manila Bay, showcasing the vibrant colors and reflections on the water.',
            'region' => 'Luzon',
            'medium' => 'Oil on Canvas',
            'dimensions' => '20 x 30 inches',
            'year' => 2021,
            'is_featured' => false
        ],
        [
            'title' => 'Tribal Patterns',
            'artist' => 'Ana Diaz',
            'price' => 15000,
            'description' => 'An abstract representation of traditional Filipino tribal patterns, celebrating the rich cultural heritage.',
            'region' => 'Mindanao',
            'medium' => 'Mixed Media',
            'dimensions' => '24 x 24 inches',
            'year' => 2022,
            'is_featured' => false
        ],
        [
            'title' => 'Banaue Rice Terraces',
            'artist' => 'Miguel Cruz',
            'price' => 18500,
            'description' => 'A detailed landscape painting of the famous Banaue Rice Terraces, showcasing this UNESCO World Heritage site.',
            'region' => 'Luzon',
            'medium' => 'Oil on Canvas',
            'dimensions' => '36 x 48 inches',
            'year' => 2020,
            'is_featured' => false
        ],
        [
            'title' => 'Tarsier Portrait',
            'artist' => 'Elena Gomez',
            'price' => 7500,
            'description' => 'A detailed portrait of the Philippine Tarsier, one of the smallest primates in the world and native to the Philippines.',
            'region' => 'Visayas',
            'medium' => 'Colored Pencil',
            'dimensions' => '16 x 20 inches',
            'year' => 2023,
            'is_featured' => false
        ],
        [
            'title' => 'Mayon Volcano',
            'artist' => 'Rafael Mendoza',
            'price' => 14200,
            'description' => 'A majestic view of the perfect cone-shaped Mayon Volcano in Albay, captured during sunset.',
            'region' => 'Luzon',
            'medium' => 'Acrylic on Canvas',
            'dimensions' => '24 x 36 inches',
            'year' => 2021,
            'is_featured' => false
        ]
    ];
    
    $productImages = [
        ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true],
        ['https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', false],
        ['https://images.unsplash.com/photo-1518982380512-5cb02dedd6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', false],
        ['https://images.unsplash.com/photo-1518982380512-5cb02dedd6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true],
        ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', false],
        ['https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', false],
        ['https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true],
        ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', false],
        ['https://images.unsplash.com/photo-1518982380512-5cb02dedd6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', false]
    ];
    
    // Insert products
    $stmt = $db->prepare("INSERT INTO products (title, artist, price, description, region, medium, dimensions, year, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    foreach ($products as $product) {
        $stmt->execute([
            $product['title'],
            $product['artist'],
            $product['price'],
            $product['description'],
            $product['region'],
            $product['medium'],
            $product['dimensions'],
            $product['year'],
            $product['is_featured']
        );
        
        $productId = $db->lastInsertId();
        
        // Insert product images
        $imageStmt = $db->prepare("INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)");
        
        // Add primary image
        $imageStmt->execute([$productId, $productImages[0][0], true]);
        
        // Add secondary images
        $imageStmt->execute([$productId, $productImages[1][0], false]);
        $imageStmt->execute([$productId, $productImages[2][0], false]);
    }
    
    // Create a sample user
    $password = password_hash('password123', PASSWORD_DEFAULT);
    $db->exec("INSERT INTO users (name, email, password, phone, address, city, region, postal_code) 
               VALUES ('Juan Dela Cruz', 'juan@example.com', '$password', '+63 912 345 6789', '123 Filipino Art Street', 'Makati City', 'Metro Manila', '1200')");
}
?>