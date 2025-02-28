  </main>
  
  <!-- Footer -->
  <footer class="bg-light text-dark py-5">
    <div class="container">
      <div class="row">
        <!-- Company Info -->
        <div class="col-lg-4 mb-4">
          <h5 class="fw-bold mb-3">Artisell</h5>
          <p class="mb-3">Supporting Filipino artists and bringing local artwork to the global stage.</p>
          <div class="mb-2">
            <i class="fas fa-map-marker-alt text-primary me-2"></i>
            <span>123 Filipino Art Street, Makati City, Philippines</span>
          </div>
          <div class="mb-2">
            <i class="fas fa-envelope text-primary me-2"></i>
            <a href="mailto:contact@artisell.com" class="text-decoration-none text-dark">contact@artisell.com</a>
          </div>
          <div class="mb-2">
            <i class="fas fa-phone text-primary me-2"></i>
            <a href="tel:+6328123456" class="text-decoration-none text-dark">+63 (2) 8123 4567</a>
          </div>
        </div>
        
        <!-- Footer Links -->
        <div class="col-lg-2 col-md-4 col-6 mb-4">
          <h5 class="fw-bold mb-3">Shop</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="index.php?page=shop" class="text-decoration-none text-dark">All Artwork</a></li>
            <li class="mb-2"><a href="index.php?page=artists" class="text-decoration-none text-dark">Featured Artists</a></li>
            <li class="mb-2"><a href="index.php?page=new" class="text-decoration-none text-dark">New Arrivals</a></li>
            <li class="mb-2"><a href="index.php?page=best-sellers" class="text-decoration-none text-dark">Best Sellers</a></li>
          </ul>
        </div>
        
        <div class="col-lg-2 col-md-4 col-6 mb-4">
          <h5 class="fw-bold mb-3">About</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="index.php?page=about" class="text-decoration-none text-dark">Our Story</a></li>
            <li class="mb-2"><a href="index.php?page=filipino-art" class="text-decoration-none text-dark">Filipino Art</a></li>
            <li class="mb-2"><a href="index.php?page=blog" class="text-decoration-none text-dark">Blog</a></li>
            <li class="mb-2"><a href="index.php?page=press" class="text-decoration-none text-dark">Press</a></li>
          </ul>
        </div>
        
        <div class="col-lg-2 col-md-4 col-6 mb-4">
          <h5 class="fw-bold mb-3">Support</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="index.php?page=contact" class="text-decoration-none text-dark">Contact Us</a></li>
            <li class="mb-2"><a href="index.php?page=faqs" class="text-decoration-none text-dark">FAQs</a></li>
            <li class="mb-2"><a href="index.php?page=shipping" class="text-decoration-none text-dark">Shipping & Returns</a></li>
            <li class="mb-2"><a href="index.php?page=privacy" class="text-decoration-none text-dark">Privacy Policy</a></li>
          </ul>
        </div>
        
        <!-- Newsletter -->
        <div class="col-lg-2 col-md-6 mb-4">
          <h5 class="fw-bold mb-3">Newsletter</h5>
          <p class="small mb-3">Subscribe to receive updates on new artwork, artists, and exclusive offers.</p>
          <form action="includes/subscribe.php" method="post">
            <div class="input-group mb-3">
              <input type="email" name="email" class="form-control" placeholder="Your email address" required>
              <button class="btn btn-primary" type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      
      <hr class="my-4">
      
      <!-- Bottom Footer -->
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <p class="small text-muted mb-0">&copy; <?php echo date('Y'); ?> Artisell. All rights reserved.</p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <div class="d-inline-flex">
            <a href="#" class="text-muted me-3"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-muted me-3"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-muted me-3"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-muted"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  
  <!-- Bootstrap JS Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Custom JS -->
  <script src="assets/js/script.js"></script>
</body>
</html>