<?php
  // Start session to manage user login and cart
  session_start();
  
  // Initialize cart if it doesn't exist
  if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
  }
  
  // Get the current page from URL parameter, default to home
  $page = isset($_GET['page']) ? $_GET['page'] : 'home';
  
  // Include header
  include 'includes/header.php';
  
  // Include the appropriate page content
  switch ($page) {
    case 'home':
      include 'pages/home.php';
      break;
    case 'product':
      include 'pages/product-detail.php';
      break;
    case 'cart':
      include 'pages/cart.php';
      break;
    case 'checkout':
      include 'pages/checkout.php';
      break;
    case 'order-confirmation':
      include 'pages/order-confirmation.php';
      break;
    case 'profile':
      include 'pages/user-profile.php';
      break;
    case 'login':
      include 'pages/login.php';
      break;
    case 'register':
      include 'pages/register.php';
      break;
    default:
      include 'pages/home.php';
  }
  
  // Include footer
  include 'includes/footer.php';
?>