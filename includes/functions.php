<?php
// Helper functions for the application

// Get all products
function getAllProducts($db, $limit = null, $featured = false) {
    $sql = "SELECT p.*, pi.image_url 
            FROM products p 
            LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1";
    
    if ($featured) {
        $sql .= " WHERE p.is_featured = 1";
    }
    
    $sql .= " ORDER BY p.created_at DESC";
    
    if ($limit) {
        $sql .= " LIMIT " . (int)$limit;
    }
    
    $stmt = $db->query($sql);
    return $stmt->fetchAll();
}

// Get product by ID
function getProductById($db, $id) {
    $stmt = $db->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$id]);
    $product = $stmt->fetch();
    
    if ($product) {
        // Get product images
        $stmt = $db->prepare("SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC");
        $stmt->execute([$id]);
        $product['images'] = $stmt->fetchAll();
    }
    
    return $product;
}

// Add item to cart
function addToCart($productId, $quantity = 1) {
    global $db;
    
    // Get product details
    $product = getProductById($db, $productId);
    
    if (!$product) {
        return false;
    }
    
    // Check if product already exists in cart
    $found = false;
    foreach ($_SESSION['cart'] as &$item) {
        if ($item['id'] == $productId) {
            $item['quantity'] += $quantity;
            $found = true;
            break;
        }
    }
    
    // If product not in cart, add it
    if (!$found) {
        $_SESSION['cart'][] = [
            'id' => $productId,
            'title' => $product['title'],
            'artist' => $product['artist'],
            'price' => $product['price'],
            'image' => $product['images'][0]['image_url'],
            'quantity' => $quantity
        ];
    }
    
    return true;
}

// Update cart item quantity
function updateCartItemQuantity($productId, $quantity) {
    foreach ($_SESSION['cart'] as &$item) {
        if ($item['id'] == $productId) {
            $item['quantity'] = $quantity;
            break;
        }
    }
}

// Remove item from cart
function removeFromCart($productId) {
    foreach ($_SESSION['cart'] as $key => $item) {
        if ($item['id'] == $productId) {
            unset($_SESSION['cart'][$key]);
            // Re-index array
            $_SESSION['cart'] = array_values($_SESSION['cart']);
            break;
        }
    }
}

// Calculate cart totals
function getCartTotals() {
    $subtotal = 0;
    foreach ($_SESSION['cart'] as $item) {
        $subtotal += $item['price'] * $item['quantity'];
    }
    
    $shipping = 250; // Fixed shipping rate
    $tax = $subtotal * 0.12; // 12% tax
    $total = $subtotal + $shipping + $tax;
    
    return [
        'subtotal' => $subtotal,
        'shipping' => $shipping,
        'tax' => $tax,
        'total' => $total
    ];
}

// Format price
function formatPrice($price) {
    return '₱' . number_format($price, 2);
}

// Check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Redirect if not logged in
function requireLogin() {
    if (!isLoggedIn()) {
        $_SESSION['redirect_after_login'] = $_SERVER['REQUEST_URI'];
        header('Location: index.php?page=login');
        exit;
    }
}

// Get user details
function getUserDetails($db, $userId) {
    $stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    return $stmt->fetch();
}

// Get user orders
function getUserOrders($db, $userId) {
    $stmt = $db->prepare("SELECT o.*, 
                          (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as items_count 
                          FROM orders o 
                          WHERE o.user_id = ? 
                          ORDER BY o.created_at DESC");
    $stmt->execute([$userId]);
    return $stmt->fetchAll();
}

// Get order details
function getOrderDetails($db, $orderId) {
    $stmt = $db->prepare("SELECT * FROM orders WHERE id = ?");
    $stmt->execute([$orderId]);
    $order = $stmt->fetch();
    
    if ($order) {
        // Get order items
        $stmt = $db->prepare("SELECT oi.*, p.title, p.artist, pi.image_url 
                              FROM order_items oi 
                              JOIN products p ON oi.product_id = p.id 
                              LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1 
                              WHERE oi.order_id = ?");
        $stmt->execute([$orderId]);
        $order['items'] = $stmt->fetchAll();
    }
    
    return $order;
}

// Generate order number
function generateOrderNumber() {
    return 'ART-' . strtoupper(substr(uniqid(), -8)) . '-' . rand(1000, 9999);
}

// Create new order
function createOrder($db, $userId, $formData, $cartItems, $totals) {
    try {
        $db->beginTransaction();
        
        // Insert order
        $stmt = $db->prepare("INSERT INTO orders 
                             (user_id, order_number, full_name, email, phone, address, city, region, postal_code, 
                              payment_method, notes, subtotal, shipping, tax, total) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $orderNumber = generateOrderNumber();
        
        $stmt->execute([
            $userId,
            $orderNumber,
            $formData['fullName'],
            $formData['email'],
            $formData['phone'],
            $formData['address'],
            $formData['city'],
            $formData['region'],
            $formData['postalCode'],
            $formData['paymentMethod'],
            $formData['notes'] ?? '',
            $totals['subtotal'],
            $totals['shipping'],
            $totals['tax'],
            $totals['total']
        ]);
        
        $orderId = $db->lastInsertId();
        
        // Insert order items
        $stmt = $db->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
        
        foreach ($cartItems as $item) {
            $stmt->execute([
                $orderId,
                $item['id'],
                $item['quantity'],
                $item['price']
            ]);
        }
        
        $db->commit();
        return $orderId;
    } catch (Exception $e) {
        $db->rollBack();
        return false;
    }
}
?>