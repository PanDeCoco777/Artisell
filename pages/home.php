<?php
// Include database and functions
require_once 'includes/db.php';
require_once 'includes/functions.php';

// Get featured products
$featuredProducts = getAllProducts($db, 3, true);

// Get all products for product grid
$products = getAllProducts($db);
?>

<!-- Featured Carousel -->
<section class="mb-5">
  <div class="bg-white p-4 rounded shadow-sm">
    <div class="mb-4">
      <h2 class="fs-1 fw-bold">Featured Artwork</h2>
      <p class="text-muted">Discover trending Filipino masterpieces</p>
    </div>
    
    <div id="featuredCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <?php foreach ($featuredProducts as $index => $product): ?>
          <div class="carousel-item <?php echo $index === 0 ? 'active' : ''; ?>">
            <div class="row">
              <div class="col-md-6">
                <div class="position-relative">
                  <img src="<?php echo $product['image_url']; ?>" class="d-block w-100 rounded" alt="<?php echo $product['title']; ?>" style="height: 400px; object-fit: cover;">
                  <span class="badge bg-primary position-absolute top-0 start-0 m-3"><?php echo $product['region']; ?></span>
                  <div class="position-absolute top-0 end-0 m-3">
                    <button class="btn btn-light rounded-circle me-2" onclick="addToFavorites(<?php echo $product['id']; ?>)">
                      <i class="fas fa-heart text-danger"></i>
                    </button>
                    <button class="btn btn-light rounded-circle" onclick="addToCart(<?php echo $product['id']; ?>)">
                      <i class="fas fa-shopping-cart text-primary"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-6 d-flex flex-column justify-content-center">
                <div class="p-4">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h3 class="fs-4 fw-semibold"><?php echo $product['title']; ?></h3>
                      <p class="text-muted">by <?php echo $product['artist']; ?></p>
                    </div>
                    <p class="fs-4 fw-bold text-primary"><?php echo formatPrice($product['price']); ?></p>
                  </div>
                  <p class="mb-4"><?php echo substr($product['description'], 0, 200) . '...'; ?></p>
                  <div class="d-flex gap-2">
                    <a href="index.php?page=product&id=<?php echo $product['id']; ?>" class="btn btn-primary flex-grow-1">View Details</a>
                    <button class="btn btn-outline-primary flex-grow-1" onclick="addToCart(<?php echo $product['id']; ?>)">
                      <i class="fas fa-shopping-cart me-2"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      <div class="carousel-indicators position-relative mt-3">
        <?php foreach ($featuredProducts as $index => $product): ?>
          <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="<?php echo $index; ?>" <?php echo $index === 0 ? 'class="active"' : ''; ?> aria-current="true" aria-label="Slide <?php echo $index + 1; ?>"></button>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<!-- Filter Section -->
<section class="mb-5">
  <div class="bg-white p-4 rounded shadow-sm">
    <form action="index.php" method="get" class="row g-3 align-items-end">
      <input type="hidden" name="page" value="search">
      
      <div class="col-md-4">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="fas fa-search text-muted"></i>
          </span>
          <input type="text" name="query" class="form-control border-start-0" placeholder="Search for artwork or artist...">
        </div>
      </div>
      
      <div class="col-md-2">
        <label for="category" class="form-label">Category</label>
        <select name="category" id="category" class="form-select">
          <option value="">All Categories</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Photography">Photography</option>
          <option value="Digital Art">Digital Art</option>
          <option value="Mixed Media">Mixed Media</option>
        </select>
      </div>
      
      <div class="col-md-2">
        <label for="price_range" class="form-label">Price Range</label>
        <select name="price_range" id="price_range" class="form-select">
          <option value="">All Prices</option>
          <option value="0-5000">Under ₱5,000</option>
          <option value="5000-10000">₱5,000 - ₱10,000</option>
          <option value="10000-20000">₱10,000 - ₱20,000</option>
          <option value="20000-50000">₱20,000 - ₱50,000</option>
          <option value="50000-">Over ₱50,000</option>
        </select>
      </div>
      
      <div class="col-md-2">
        <label for="region" class="form-label">Region</label>
        <select name="region" id="region" class="form-select">
          <option value="">All Regions</option>
          <option value="Luzon">Luzon</option>
          <option value="Visayas">Visayas</option>
          <option value="Mindanao">Mindanao</option>
        </select>
      </div>
      
      <div class="col-md-2">
        <button type="submit" class="btn btn-primary w-100">Filter</button>
      </div>
    </form>
  </div>
</section>

<!-- Product Grid -->
<section>
  <h2 class="fs-2 fw-bold mb-4">Browse Filipino Artwork</h2>
  
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
    <?php foreach ($products as $product): ?>
      <div class="col">
        <div class="card h-100 shadow-sm product-card">
          <div class="position-relative">
            <img src="<?php echo $product['image_url']; ?>" class="card-img-top" alt="<?php echo $product['title']; ?>" style="height: 220px; object-fit: cover;">
            <span class="position-absolute top-2 end-2 badge bg-dark"><?php echo $product['region']; ?></span>
            <div class="product-overlay">
              <a href="index.php?page=product&id=<?php echo $product['id']; ?>" class="btn btn-light btn-sm">
                <i class="fas fa-eye me-1"></i> View Details
              </a>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title text-truncate"><?php echo $product['title']; ?></h5>
            <p class="card-text text-muted">by <?php echo $product['artist']; ?></p>
            <p class="card-text fw-bold text-primary"><?php echo formatPrice($product['price']); ?></p>
          </div>
          <div class="card-footer bg-white border-top-0">
            <button class="btn btn-primary w-100" onclick="addToCart(<?php echo $product['id']; ?>)">
              <i class="fas fa-shopping-cart me-2"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
  
  <!-- Pagination -->
  <nav class="mt-5">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
          <i class="fas fa-chevron-left"></i>
        </a>
      </li>
      <li class="page-item active"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">
          <i class="fas fa-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</section>

<!-- Add to Cart JavaScript -->
<script>
function addToCart(productId) {
  // Send AJAX request to add item to cart
  fetch('ajax/add_to_cart.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'product_id=' + productId
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Show success message
      alert('Item added to cart!');
      // Reload page to update cart count
      location.reload();
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function addToFavorites(productId) {
  // Check if user is logged in
  <?php if (!isLoggedIn()): ?>
    alert('Please log in to add items to favorites');
    window.location.href = 'index.php?page=login';
    return;
  <?php endif; ?>
  
  // Send AJAX request to add item to favorites
  fetch('ajax/add_to_favorites.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'product_id=' + productId
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Item added to favorites!');
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
</script>

<!-- Custom CSS for Product Cards -->
<style>
.product-card {
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.carousel-indicators [data-bs-target] {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  border: none;
}

.carousel-indicators .active {
  background-color: #0d6efd;
}
</style>