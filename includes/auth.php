<?php
// Authentication functions

// Register a new user
function registerUser($db, $name, $email, $password) {
    // Check if email already exists
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        return ['success' => false, 'message' => 'Email already exists'];
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $db->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $result = $stmt->execute([$name, $email, $hashedPassword]);
    
    if ($result) {
        // Get the new user ID
        $userId = $db->lastInsertId();
        
        // Log the user in
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_name'] = $name;
        $_SESSION['user_email'] = $email;
        
        return ['success' => true, 'user_id' => $userId];
    } else {
        return ['success' => false, 'message' => 'Registration failed'];
    }
}

// Login a user
function loginUser($db, $email, $password) {
    // Get user by email
    $stmt = $db->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user) {
        return ['success' => false, 'message' => 'Invalid email or password'];
    }
    
    // Verify password
    if (password_verify($password, $user['password'])) {
        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        
        return ['success' => true, 'user_id' => $user['id']];
    } else {
        return ['success' => false, 'message' => 'Invalid email or password'];
    }
}

// Update user profile
function updateUserProfile($db, $userId, $data) {
    $stmt = $db->prepare("UPDATE users SET 
                         name = ?, 
                         phone = ?, 
                         address = ?, 
                         city = ?, 
                         region = ?, 
                         postal_code = ? 
                         WHERE id = ?");
    
    $result = $stmt->execute([
        $data['name'],
        $data['phone'] ?? null,
        $data['address'] ?? null,
        $data['city'] ?? null,
        $data['region'] ?? null,
        $data['postalCode'] ?? null,
        $userId
    ]);
    
    if ($result) {
        // Update session name if it changed
        $_SESSION['user_name'] = $data['name'];
        return true;
    }
    
    return false;
}
?>