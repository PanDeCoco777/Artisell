<?php
// Include database and functions
require_once 'includes/db.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';

// Require login for checkout
requireLogin();

// Get cart items and calculate totals
$cartItems = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];

// Redirect to cart if cart is empty
if (empty($cartItems)) {
    header('Location: index.php?page=cart');
    exit;
}

$cartTotals = getCartTotals();

// Get user details for pre-filling the form
$user = getUserDetails($db, $_SESSION['user_id']);

// Process checkout form submission
$errors = [];
$formSubmitted = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formSubmitted = true;
    
    // Validate form data
    $requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'region', 'postalCode', 'paymentMethod'];
    $formData = [];
    
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            $errors[$field] = ucfirst(preg_replace('/([A-Z])/', ' $1', $field)) . ' is required';
        } else {
            $formData[$field] = $_POST[$field];
        }
    }
    
    // Optional fields
    $formData['notes'] = $_POST['notes'] ?? '';
    
    // If no errors, process the order
    if (empty($errors)) {
        $orderId = createOrder($db, $_SESSION['user_id'], $formData, $cartItems, $cartTotals);
        
        if ($orderId) {
            // Clear the cart
            $_SESSION['cart'] = [];
            
            // Redirect to order confirmation
            header('Location: index.php?page=order-confirmation&id=' . $orderId);
            exit;
        } else {
            $errors['general'] = 'There was a problem processing your order. Please try again.';
        }
    }
}
?>

<div class="container py-4">
  <a href="index.php?page=cart" class="btn btn-link text-decoration-none mb-4">
    <i class="fas fa-arrow-left me-2"></i> Back to Cart
  </a>
  
  <h1 class="fs-2 fw-bold mb-4">Checkout</h1>
  
  <?php if (isset($errors['general'])): ?>
    <div class="alert alert-danger"><?php echo $errors['general']; ?></div>
  <?php endif; ?>
  
  <div class="row">
    <!-- Checkout Form -->
    <div class="col-lg-8 mb-4">
      <form method="post" action="">
        <!-- Shipping Information -->
        <div class="card mb-4">
          <div class="card-header bg-white">
            <h5 class="card-title mb-0">Shipping Information</h5>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="fullName" class="form-label">Full Name</label>
                <input type="text" class="form-control <?php echo isset($errors['fullName']) ? 'is-invalid' : ''; ?>" id="fullName" name="fullName" value="<?php echo $formSubmitted ? ($_POST['fullName'] ?? '') : ($user['name'] ?? ''); ?>">
                <?php if (isset($errors['fullName'])): ?>
                  <div class="invalid-feedback"><?php echo $errors['fullName']; ?></div>
                <?php endif; ?>
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control <?php echo isset($errors['email']) ? 'is-invalid' : ''; ?>" id="email" name="email" value="<?php echo $formSubmitted ? ($_POST['email'] ?? '') : ($user['email'] ?? ''); ?>">
                <?php if (isset($errors['email'])): ?>
                  <div class="invalid-feedback"><?php echo $errors['email']; ?></div>
                <?php endif; ?>
              </div>
              <div class="col-md-6">
                <label for="phone" class="form-label">Phone Number</label>
                <input type="text" class="form-control <?php echo isset($errors['phone']) ? 'is-invalid' : ''; ?>" id="phone" name="phone" value="<?php echo $formSubmitted ? ($_POST['phone'] ?? '') : ($user['phone'] ?? ''); ?>">
                <?php if (isset($errors['phone'])): ?>
                  <div class="invalid-feedback"><?php echo $errors['phone']; ?></div>
                <?php endif; ?>
              </div>
              <div class="col-12">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control <?php echo isset($errors['address']) ? 'is-invalid' : ''; ?>" id="address" name="address" value="<?php echo $formSubmitted ? ($_POST['address'] ?? '') : ($user['address'] ?? ''); ?>">
                <?php if (isset($errors['address'])): ?>
                  <div class="invalid-feedback"><?php echo $errors['address']; ?></div>
                <?php endif; ?>
              </div>
              <div class="col-md-6">
                <label for="city" class="form-label">City</label>
                <input type="text" class="form-control <?php echo isset($errors['city']) ? 'is-invalid' : ''; ?>" id="city" name="city" value="<?php echo $formSubmitted ? ($_POST['city'] ?? '') : ($user['city'] ?? ''); ?>">
                <?php if (isset($errors['city'])): ?>
                  <div class="invalid-feedback"><?php echo $errors['city']; ?></div>
                <?php endif; ?>
              </div>
              <div class="col-md-4">
                <label for="region" class="form-label">Region</label>
                <input type="text" class="form-control <?php echo isset($errors['region']) ? 'is-invalid' : ''; ?>" id="region" name="region" value="<?php echo $formSubmitted ? ($_POST['region'] ?? '') : ($user['region'] ?? ''); ?>">
                <?php if (isset($errors['region'])): ?>
                  <div class="invalid-feedback"><?php echo $errors['region']; ?></div>
                <?php endif; ?>
              </div>
              <div class="col-md-2">
                <label for="postalCode" class="form-label">Postal Code</label>
                <input type="text" class="form-control <?php echo isset($errors['postalCode']) ? 'is-invalid' : ''; ?>" id="postalCode" name="postalCode" value="<?php echo $formSubmitted ? ($_POST['postalCode'] ?? '') : ($user['postal_code'] ?? ''); ?>">
                <?php if (isset($errors['postalCode'])): ?>
                  <div class="invalid-feedback"><?php echo $errors['postalCode']; ?></div>
                <?php endif; ?>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Payment Method -->
        <div class="card mb-4">
          <div class="card-header bg-white">
            <h5 class="card-title mb-0">Payment Method</h5>
          </div>
          <div class="card-body">
            <div class="mb-3 <?php echo isset($errors['paymentMethod']) ? 'is-invalid' : ''; ?>">
              <div class="form-check mb-3 p-0">
                <input type="radio" class="btn-check" name="paymentMethod" id="credit_card" value="credit_card" <?php echo ($formSubmitted && ($_POST['paymentMethod'] ?? '') === 'credit_card') || !$formSubmitted ? 'checked' : ''; ?>>
                <label class="btn btn-outline-secondary w-100 text-start" for="credit_card">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-credit-card text-primary me-3"></i>
                    <div>
                      <strong>Credit Card</strong>
                      <p class="text-muted small mb-0">Pay with Visa, Mastercard, or JCB</p>
                    </div>
                  </div>
                </label>
              </div>
              
              <div class="form-check mb-3 p-0">
                <input type="radio" class="btn-check" name="paymentMethod" id="gcash" value="gcash" <?php echo $formSubmitted && ($_POST['paymentMethod'] ?? '') === 'gcash' ? 'checked' : ''; ?>>
                <label class="btn btn-outline-secondary w-100 text-start" for="gcash">
                  <div class="d-flex align-items-center">
                    <span class="text-primary fw-bold me-3" style="width: 24px; text-align: center;">G</span>
                    <div>
                      <strong>GCash</strong>
                      <p class="text-muted small mb-0">Pay with your GCash account</p>
                    </div>
                  </div>
                </label>
              </div>
              
              <div class="form-check mb-3 p-0">
                <input type="radio" class="btn-check" name="paymentMethod" id="bank_transfer" value="bank_transfer" <?php echo $formSubmitted && ($_POST['paymentMethod'] ?? '') === 'bank_transfer' ? 'checked' : ''; ?>>
                <label class="btn btn-outline-secondary w-100 text-start" for="bank_transfer">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-university text-primary me-3"></i>
                    <div>
                      <strong>Bank Transfer</strong>
                      <p class="text-muted small mb-0">Pay via bank transfer</p>
                    </div>
                  </div>
                </label>
              </div>
              
              <div class="form-check p-0">
                <input type="radio" class="btn-check" name="paymentMethod" id="cod" value="cod" <?php echo $formSubmitted && ($_POST['paymentMethod'] ?? '') === 'cod' ? 'checked' : ''; ?>>
                <label class="btn btn-outline-secondary w-100 text-start" for="cod">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-truck text-primary me-3"></i>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <p class="text-muted small mb-0">Pay when you receive your order</p>
                    </div>
                  </div>
                </label>
              </div>
              
              <?php if (isset($errors['paymentMethod'])): ?>
                <div class="invalid-feedback d-block"><?php echo $errors['paymentMethod']; ?></div>
              <?php endif; ?>
            </div>
          </div>
        </div>
        
        <!-- Additional Information -->
        <div class="card mb-4">
          <div class="card-header bg-white">
            <h5 class="card-title mb-0">Additional Information</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="notes" class="form-label">Order Notes (Optional)</label>
              <textarea class="form-control" id="notes" name="notes" rows="3"><?php echo $formSubmitted ? ($_POST['notes'] ?? '') : ''; ?></textarea>
            </div>
          </div>
        </div>
        
        <!-- Mobile Order Summary (visible on small screens) -->
        <div class="d-lg-none mb-4">
          <div class="card">
            <div class="card-header bg-white">
              <h5 class="card-title mb-0">Order Summary</h5>
            </div>
            <div class="card-body">
              <?php foreach ($cartItems as $item): ?>
                <div class="d-flex mb-3">
                  <img src="<?php echo $item['image']; ?>" alt="<?php echo $item['title']; ?>" class="rounded" style="width: 60px; height: 60px; object-fit: cover;">
                  <div class="ms-3">
                    <h6 class="mb-0"><?php echo $item['title']; ?></h6>
                    <p class="text-muted small mb-0">Qty: <?php echo $item['quantity']; ?></p>
                    <p class="fw-bold text-primary mb-0"><?php echo formatPrice($item['price'] * $item['quantity']); ?></p>
                  </div>
                </div>
              <?php endforeach; ?>
              
              <hr>
              
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Subtotal</span>
                <span><?php echo formatPrice($cartTotals['subtotal']); ?></span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Shipping</span>
                <span><?php echo formatPrice($cartTotals['shipping']); ?></span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Tax (12%)</span>
                <span><?php echo formatPrice($cartTotals['tax']); ?></span>
              </div>
              <hr>
              <div class="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span><?php echo formatPrice($cartTotals['total']); ?></span>
              </div>
            </div>
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary btn-lg w-100 w-lg-auto">
          Place Order
        </button>
      </form>
    </div>
    
    <!-- Order Summary (desktop) -->
    <div class="col-lg-4 d-none d-lg-block">
      <div class="card sticky-top" style="top: 100px;">
        <div class="card-header bg-white">
          <h5 class="card-title mb-0">Order Summary</h5>
        </div>
        <div class="card-body">
          <?php foreach ($cartItems as $item): ?>
            <div class="d-flex mb-3">
              <img src="<?php echo $item['image']; ?>" alt="<?php echo $item['title']; ?>" class="rounded" style="width: 60px; height: 60px; object-fit: cover;">
              <div class="ms-3">
                <h6 class="mb-0"><?php echo $item['title']; ?></h6>
                <p class="text-muted small mb-0">Qty: <?php echo $item['quantity']; ?></p>
                <p class="fw-bold text-primary mb-0"><?php echo formatPrice($item['price'] * $item['quantity']); ?></p>
              </div>
            </div>
          <?php endforeach; ?>
          
          <hr>
          
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Subtotal</span>
            <span><?php echo formatPrice($cartTotals['subtotal']); ?></span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Shipping</span>
            <span><?php echo formatPrice($cartTotals['shipping']); ?></span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Tax (12%)</span>
            <span><?php echo formatPrice($cartTotals['tax']); ?></span>
          </div>
          <hr>
          <div class="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span><?php echo formatPrice($cartTotals['total']); ?></span>
          </div>
          
          <div class="mt-4 p-3 bg-light rounded">
            <div class="d-flex">
              <i class="fas fa-check-circle text-success me-2 mt-1"></i>
              <div>
                <p class="fw-medium mb-1">Secure Checkout</p>
                <p class="text-muted small mb-0">Your payment information is encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>