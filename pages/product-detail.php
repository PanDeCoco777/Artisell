<?php
// Include database and functions
require_once 'includes/db.php';
require_once 'includes/functions.php';

// Get product ID from URL
$productId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if (!$productId) {
    // Redirect to home if no product ID
    header('Location: index.php');
    exit;
}

// Get product details
$product = getProductById($db, $productId);

if (!$product) {
    // Product not found
    echo '<div class="alert alert-danger">Product not found</div>';
    exit;
}

// Process add to cart if form submitted
if (isset($_POST['add_to_cart'])) {
    $quantity = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 1;
    if ($quantity < 1) $quantity = 1;
    
    addToCart($productId, $quantity);
    
    // Redirect to cart if buy now was clicked
    if (isset($_POST['buy_now'])) {
        header('Location: index.php?page=cart');
        exit;
    }
    
    // Redirect to same page to prevent form resubmission
    header('Location: index.php?page=product&id=' . $productId . '&added=1');
    exit;
}

// Show success message if item was added to cart
$showAddedMessage = isset($_GET['added']) && $_GET['added'] == 1;
?>

<div class="container py-4">
  <?php if ($showAddedMessage): ?>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      Item added to cart successfully!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  <?php endif; ?>
  
  <a href="javascript:history.back()" class="btn btn-link text-decoration-none mb-4">
    <i class="fas fa-arrow-left me-2"></i> Back to browsing
  </a>
  
  <div class="row">
    <!-- Product Images -->
    <div class="col-md-6 mb-4">
      <div class="position-relative">
        <img id="mainImage" src="<?php echo $product['images'][0]['image_url']; ?>" class="img-fluid rounded border" alt="<?php echo $product['title']; ?>">
      </div>
      <div class="d-flex mt-3 overflow-auto">
        <?php foreach ($product['images'] as $index => $image): ?>
          <div class="me-2">
            <img src="<?php echo $image['image_url']; ?>" 
                 class="img-thumbnail thumbnail-image <?php echo $index === 0 ? 'active-thumbnail' : ''; ?>" 
                 alt="<?php echo $product['title']; ?> - view <?php echo $index + 1; ?>" 
                 style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;"
                 onclick="changeMainImage('<?php echo $image['image_url']; ?>', this)">
          </div>
        <?php endforeach; ?>
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="col-md-6">
      <div class="mb-4">
        <span class="badge bg-primary mb-2"><?php echo $product['region']; ?></span>
        <h1 class="fs-2 fw-bold"><?php echo $product['title']; ?></h1>
        <p class="fs-5 text-muted">by <?php echo $product['artist']; ?></p>
      </div>
      
      <div class="d-flex justify-content-between align-items-center mb-4">
        <p class="fs-3 fw-bold text-primary mb-0"><?php echo formatPrice($product['price']); ?></p>
        <div>
          <button class="btn btn-outline-secondary me-2" onclick="addToFavorites(<?php echo $product['id']; ?>)">
            <i class="fas fa-heart"></i>
          </button>
          <button class="btn btn-outline-secondary">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
      
      <hr>
      
      <form method="post" action="">
        <div class="mb-4">
          <label for="quantity" class="form-label fw-medium">Quantity:</label>
          <div class="input-group" style="width: 150px;">
            <button type="button" class="btn btn-outline-secondary" onclick="decrementQuantity()">
              <i class="fas fa-minus"></i>
            </button>
            <input type="number" id="quantity" name="quantity" class="form-control text-center" value="1" min="1">
            <button type="button" class="btn btn-outline-secondary" onclick="incrementQuantity()">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        
        <div class="d-flex flex-column flex-sm-row gap-2 mb-4">
          <button type="submit" name="add_to_cart" class="btn btn-primary flex-grow-1">
            <i class="fas fa-shopping-cart me-2"></i> Add to Cart
          </button>
          <button type="submit" name="buy_now" class="btn btn-secondary flex-grow-1">
            Buy Now
          </button>
        </div>
      </form>
      
      <hr>
      
      <!-- Product Details Tabs -->
      <ul class="nav nav-tabs" id="productTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">Description</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="false">Details</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="shipping-tab" data-bs-toggle="tab" data-bs-target="#shipping" type="button" role="tab" aria-controls="shipping" aria-selected="false">Shipping</button>
        </li>
      </ul>
      <div class="tab-content p-3 border border-top-0 rounded-bottom" id="productTabsContent">
        <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
          <p><?php echo $product['description']; ?></p>
        </div>
        <div class="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
          <div class="row">
            <div class="col-4 fw-medium">Medium</div>
            <div class="col-8"><?php echo $product['medium']; ?></div>
          </div>
          <div class="row mt-2">
            <div class="col-4 fw-medium">Dimensions</div>
            <div class="col-8"><?php echo $product['dimensions']; ?></div>
          </div>
          <div class="row mt-2">
            <div class="col-4 fw-medium">Year</div>
            <div class="col-8"><?php echo $product['year']; ?></div>
          </div>
          <div class="row mt-2">
            <div class="col-4 fw-medium">Region</div>
            <div class="col-8"><?php echo $product['region']; ?></div>
          </div>
        </div>
        <div class="tab-pane fade" id="shipping" role="tabpanel" aria-labelledby="shipping-tab">
          <p>All artwork is carefully packaged to ensure safe delivery. Shipping typically takes 3-5 business days within the Philippines and 10-14 business days for international orders.</p>
          <p>For fragile or large pieces, special handling fees may apply. Please contact us for custom shipping arrangements.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// Change main image when thumbnail is clicked
function changeMainImage(imageUrl, thumbnail) {
  document.getElementById('mainImage').src = imageUrl;
  
  // Update active thumbnail
  const thumbnails = document.querySelectorAll('.thumbnail-image');
  thumbnails.forEach(thumb => {
    thumb.classList.remove('active-thumbnail');
  });
  thumbnail.classList.add('active-thumbnail');
}

// Increment quantity
function incrementQuantity() {
  const quantityInput = document.getElementById('quantity');
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Decrement quantity
function decrementQuantity() {
  const quantityInput = document.getElementById('quantity');
  const currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
}

// Add to favorites
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

<style>
.active-thumbnail {
  border: 2px solid #0d6efd;
}
</style>