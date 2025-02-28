import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import FeaturedCarousel from "./FeaturedCarousel";
import FilterSection from "./FilterSection";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";
import AuthModal from "./auth/AuthModal";

interface CartItem {
  id: string;
  quantity: number;
}

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Painting",
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["Luzon"]);

  // Mock user state - in a real app, this would come from authentication context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const navigate = useNavigate();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAuthModalOpen = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAddToCart = (productId: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prev, { id: productId, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would filter products based on the search query
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    // In a real app, you would filter products based on selected categories
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    // In a real app, you would filter products based on price range
  };

  const handleRegionChange = (regions: string[]) => {
    setSelectedRegions(regions);
    // In a real app, you would filter products based on selected regions
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onAuthModalOpen={handleAuthModalOpen}
      />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Featured Carousel */}
          <section className="mb-12">
            <FeaturedCarousel
              onViewArtwork={handleViewProduct}
              onAddToFavorites={(id) => console.log(`Add to favorites ${id}`)}
            />
          </section>

          {/* Filter Section */}
          <section className="mb-8">
            <FilterSection
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={handlePriceRangeChange}
              onRegionChange={handleRegionChange}
            />
          </section>

          {/* Product Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Browse Filipino Artwork</h2>
            <ProductGrid
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewProduct}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        defaultTab="login"
      />
    </div>
  );
};

export default Home;
