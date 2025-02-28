<?php
// Include database and functions
require_once 'includes/db.php';
require_once 'includes/functions.php';

// Process cart actions
if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $productId = isset($_POST['product_id']) ? $_POST['product_id'] : 0;
    
    if ($action === 'update' && isset($_POST['quantity'])) {
        $quantity = (int)$_POST['quantity'];
        if ($quantity > 0) {
            updateCartItemQuantity($productId, $quantity);
        }
    } elseif ($action === 'remove') {
        removeFromCart($productId);
    }
    
    // Redirect to prevent form resubmission
    header('Location: index.php?page=cart');
    exit;
}

// Get cart items and calculate totals
$cartItems = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
$cartTotals = getCartTotals();
?>

<div class="container py-4">
  <?php if (empty($cartItems)): ?>
    <!-- Empty Cart -->
    <div class="text-center py-5">
      <div class="mb-4 mx-auto bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 100px; height: 100px;">
        <i class="fas fa-shopping-cart fa-3x text-muted"></i>
      </div>
      <h2 class="fs-3 fw-bold mb-2">Your cart is empty</h2>
      <p class="text-muted mb-4">Looks like you haven't added any artwork to your cart yet.</p>
      <a href="index.php" class="btn btn-primary">Continue Shopping</a>
    </div>
  <?php else: ?>
    <!-- Cart with Items -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fs-2 fw-bold">Your Cart</h1>
      <a href="index.php" class="btn btn-link text-decoration-none">
        <i class="fas fa-arrow-left me-2"></i> Continue Shopping
      </a>
    </div>
    
    <div class="row">
      <!-- Cart Items -->
      <div class="col-lg-8 mb-4">
        <?php foreach ($cartItems as $item): ?>
          <div class="card mb-3">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-2 col-4 mb-3 mb-md-0">
                  <img src="<?php echo $item['image']; ?>" class="img-fluid rounded" alt="<?php echo $item['title']; ?>">
                </div>
                <div class="col-md-10 col-8">
                  <div class="row">
                    <div class="col-md-8 mb-3 mb-md-0">
                      <h5 class="card-title"><?php echo $item['title']; ?></h5>
                      <p class="card-text text-muted">by <?php echo $item['artist']; ?></p>
                      <p class="card-text fw-bold text-primary"><?php echo formatPrice($item['price']); ?></p>
                    </div>
                    <div class="col-md-4">
                      <form method="post" action="">
                        <input type="hidden" name="action" value="update">
                        <input type="hidden" name="product_id" value="<?php echo $item['id']; ?>">
                        <div class="d-flex align-items-center mb-3">
                          <div class="input-group input-group-sm" style="width: 120px;">
                            <button type="button" class="btn btn-outline-secondary" onclick="decrementQuantity(this)">
                              <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" name="quantity" class="form-control text-center" value="<?php echo $item['quantity']; ?>" min="1">
                            <button type="button" class="btn btn-outline-secondary" onclick="incrementQuantity(this)">
                              <i class="fas fa-plus"></i>
                            </button>
                          </div>
                          <button type="submit" class="btn btn-sm btn-outline-primary ms-2">
                            <i class="fas fa-sync-alt"></i>
                          </button>
                        </div>
                      </form>
                      <form method="post" action="">
                        <input type="hidden" name="action" value="remove">
                        <input type="hidden" name="product_id" value="<?php echo $item['id']; ?>">
                        <button type="submit" class="btn btn-sm btn-danger">
                          <i class="fas fa-trash-alt me-1"></i> Remove
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
      
      <!-- Order Summary -->
      <div class="col-lg-4">
        <div class="card sticky-top" style="top: 100px;">
          <div class="card-header bg-white">
            <h5 class="card-title mb-0">Order Summary</h5>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Subtotal</span>
              <span><?php echo formatPrice($cartTotals['subtotal']); ?></span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Tax</span>
              <span>Calculated at checkout</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
              <span>Estimated Total</span>
              <span><?php echo formatPrice($cartTotals['subtotal']); ?></span>
            </div>
            <a href="index.php?page=checkout" class="btn btn-primary w-100 mt-4">Proceed to Checkout</a>
            <p class="text-center text-muted small mt-3">
              Secure checkout powered by Artisell. Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  <?php endif; ?>
</div>

<script>
// Increment quantity
function incrementQuantity(button) {
  const input = button.parentNode.querySelector('input[type="number"]');
  input.value = parseInt(input.value) + 1;
}

// Decrement quantity
function decrementQuantity(button) {
  const input = button.parentNode.querySelector('input[type="number"]');
  const currentValue = parseInt(input.value);
  if (currentValue > 1) {
    input.value = currentValue - 1;
  }
}
</script>