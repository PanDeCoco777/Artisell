<?php
// Include database and functions
require_once 'includes/db.php';
require_once 'includes/functions.php';

// Require login
requireLogin();

// Get order ID from URL
$orderId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// If no order ID, try to get the most recent order for the user
if (!$orderId) {
    $stmt = $db->prepare("SELECT id FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1");
    $stmt->execute([$_SESSION['user_id']]);
    $result = $stmt->fetch();
    
    if ($