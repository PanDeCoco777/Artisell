<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artisell - Filipino Art E-commerce</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Custom CSS -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
    <div class="container">
      <!-- Logo -->
      <a class="navbar-brand" href="index.php">
        <span class="fw-bold text-primary">Artisell</span>
        <span class="ms-2 text-muted small">Filipino Art</span>
      </a>
      
      <!-- Mobile Toggle Button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <!-- Navigation Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="index.php">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="index.php?page=categories">Categories</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="index.php?page=about">About Us</a>
          </li>
        </ul>
        
        <!-- Search, Auth, and Cart -->
        <div class="d-flex align-items-center">
          <!-- Search Button -->
          <button class="btn btn-link text-dark" type="button" data-bs-toggle="modal" data-bs-target="#searchModal">
            <i class="fas fa-search"></i>
          </button>
          
          <!-- User Account -->
          <?php if(isset($_SESSION['user_id'])): ?>
            <div class="dropdown ms-3">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
                <i class="fas fa-user me-1"></i>
                <?php echo $_SESSION['user_name']; ?>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="index.php?page=profile"><i class="fas fa-user me-2"></i> Profile</a></li>
                <li><a class="dropdown-item" href="index.php?page=profile&tab=orders"><i class="fas fa-box me-2"></i> My Orders</a></li>
                <li><a class="dropdown-item" href="index.php?page=favorites"><i class="fas fa-heart me-2"></i> Favorites</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="includes/logout.php"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
              </ul>
            </div>
          <?php else: ?>
            <a href="index.php?page=login" class="btn btn-outline-secondary ms-3">Login / Register</a>
          <?php endif; ?>
          
          <!-- Cart Button -->
          <a href="index.php?page=cart" class="btn btn-link text-dark position-relative ms-3">
            <i class="fas fa-shopping-cart"></i>
            <?php if(isset($_SESSION['cart']) && count($_SESSION['cart']) > 0): ?>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                <?php 
                  $total_items = 0;
                  foreach($_SESSION['cart'] as $item) {
                    $total_items += $item['quantity'];
                  }
                  echo $total_items;
                ?>
              </span>
            <?php endif; ?>
          </a>
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Search Modal -->
  <div class="modal fade" id="searchModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <form action="index.php" method="get">
            <input type="hidden" name="page" value="search">
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="fas fa-search text-muted"></i>
              </span>
              <input type="text" name="query" class="form-control border-start-0" placeholder="Search for artwork, artists, or styles..." autofocus>
              <button type="submit" class="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content Container -->
  <main class="container py-5 mt-5">