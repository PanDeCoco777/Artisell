import React, { useState } from "react";
import Navbar from "./Navbar";
import FeaturedCarousel from "./FeaturedCarousel";
import FilterSection from "./FilterSection";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";
import AuthModal from "./auth/AuthModal";

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Painting",
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["Luzon"]);

  // Mock user state - in a real app, this would come from authentication context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");

  const handleAuthModalOpen = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAddToCart = (productId: string) => {
    setCartItems((prev) => [...prev, productId]);
    // In a real app, you would also update the cart in a database or context
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
        cartItemCount={cartItems.length}
        onAuthModalOpen={handleAuthModalOpen}
      />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {" "}
        {/* pt-20 to account for fixed navbar */}
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Featured Carousel */}
          <section className="mb-12">
            <FeaturedCarousel
              onViewArtwork={(id) => console.log(`View artwork ${id}`)}
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
            <ProductGrid onAddToCart={handleAddToCart} />
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
