<?php
require_once 'db_config.php';
header('Content-Type: application/json');

// Enable CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get request path
$request_uri = $_SERVER['REQUEST_URI'];
$uri_parts = explode('/', trim($request_uri, '/'));

// Remove base path if needed
$api_index = array_search('api', $uri_parts);
if ($api_index !== false) {
    $uri_parts = array_slice($uri_parts, $api_index + 1);
}

$resource = $uri_parts[0] ?? '';
$id = $uri_parts[1] ?? null;
$method = $_SERVER['REQUEST_METHOD'];

// Get request body for POST/PUT requests
$data = json_decode(file_get_contents('php://input'), true);

// Route the request
switch ($resource) {
    case 'products':
        handleProducts($method, $id, $data, $conn);
        break;
    case 'users':
        handleUsers($method, $id, $data, $conn);
        break;
    case 'auth':
        handleAuth($method, $data, $conn);
        break;
    case 'cart':
        handleCart($method, $id, $data, $conn);
        break;
    case 'orders':
        handleOrders($method, $id, $data, $conn);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Resource not found']);
}

// Handle product-related requests
function handleProducts($method, $id, $data, $conn) {
    switch ($method) {
        case 'GET':
            if ($id) {
                // Get specific product
                $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $product = $result->fetch_assoc();
                
                if ($product) {
                    echo json_encode($product);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Product not found']);
                }
            } else {
                // Get all products
                $result = $conn->query("SELECT * FROM products");
                $products = [];
                
                while ($row = $result->fetch_assoc()) {
                    $products[] = $row;
                }
                
                echo json_encode($products);
            }
            break;
            
        case 'POST':
            // Create new product
            // Implementation depends on your data structure
            break;
            
        case 'PUT':
            // Update product
            // Implementation depends on your data structure
            break;
            
        case 'DELETE':
            // Delete product
            if ($id) {
                $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                
                if ($stmt->affected_rows > 0) {
                    echo json_encode(['message' => 'Product deleted successfully']);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Product not found']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Product ID is required']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
}

// Handle user-related requests
function handleUsers($method, $id, $data, $conn) {
    // Similar implementation as handleProducts
}

// Handle authentication requests
function handleAuth($method, $data, $conn) {
    if ($method !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    $action = $data['action'] ?? '';
    
    switch ($action) {
        case 'login':
            // Handle login
            $email = $data['email'] ?? '';
            $password = $data['password'] ?? '';
            
            $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            
            if ($user && password_verify($password, $user['password'])) {
                // Password is correct
                unset($user['password']); // Don't send password back
                echo json_encode([
                    'success' => true,
                    'user' => $user,
                    'token' => 'sample_token' // In a real app, generate a JWT
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid credentials']);
            }
            break;
            
        case 'register':
            // Handle registration
            $name = $data['name'] ?? '';
            $email = $data['email'] ?? '';
            $password = $data['password'] ?? '';
            
            // Check if user already exists
            $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                http_response_code(409);
                echo json_encode(['error' => 'User already exists']);
                return;
            }
            
            // Hash password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            // Insert new user
            $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $name, $email, $hashed_password);
            $stmt->execute();
            
            if ($stmt->affected_rows > 0) {
                echo json_encode([
                    'success' => true,
                    'message' => 'User registered successfully'
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Registration failed']);
            }
            break;
            
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
    }
}

// Handle cart-related requests
function handleCart($method, $id, $data, $conn) {
    // Implementation for cart operations
}

// Handle order-related requests
function handleOrders($method, $id, $data, $conn) {
    // Implementation for order operations
}

// Close the database connection
$conn->close();
