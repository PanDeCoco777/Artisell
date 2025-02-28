import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Heart,
  Package,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  cartItemCount?: number;
  onAuthModalOpen?: () => void;
}

const Navbar = ({
  isLoggedIn = false,
  userName = "User",
  cartItemCount = 0,
  onAuthModalOpen = () => {},
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleAuthModalOpen = () => {
    setIsAuthModalOpen(true);
    onAuthModalOpen();
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would navigate to search results page with the query
    console.log(`Searching for: ${searchQuery}`);
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    // In a real app, you would implement logout logic here
    console.log("Logout clicked");
    navigate("/");
  };

  return (
    <nav className="w-full h-20 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">Artisell</span>
          <span className="text-sm ml-2 text-gray-500">Filipino Art</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary font-medium">
            Home
          </Link>
          <Link
            to="/categories"
            className="text-gray-700 hover:text-primary font-medium"
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-primary font-medium"
          >
            About Us
          </Link>
        </div>

        {/* Desktop Search, Auth, and Cart */}
        <div className="hidden md:flex items-center space-x-4">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <Search className="h-5 w-5 text-gray-500" />
                <Input
                  placeholder="Search for artwork, artists, or styles..."
                  className="flex-1"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </form>
            </DialogContent>
          </Dialog>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="w-full flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile/orders"
                    className="w-full flex items-center gap-2"
                  >
                    <Package className="h-4 w-4" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/favorites"
                    className="w-full flex items-center gap-2"
                  >
                    <Heart className="h-4 w-4" />
                    Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={handleAuthModalOpen}>
              Login / Register
            </Button>
          )}

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full left-0 shadow-lg">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center border rounded-md overflow-hidden"
            >
              <Input
                placeholder="Search..."
                className="border-0 focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="ghost" size="icon" type="submit">
                <Search className="h-5 w-5" />
              </Button>
            </form>
            <Link
              to="/"
              className="py-2 px-4 hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="py-2 px-4 hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="py-2 px-4 hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  to="/profile/orders"
                  className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <Package className="h-4 w-4" />
                  My Orders
                </Link>
                <Link
                  to="/favorites"
                  className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <Heart className="h-4 w-4" />
                  Favorites
                </Link>
                <button
                  className="py-2 px-4 text-left hover:bg-gray-100 rounded-md flex items-center gap-2 w-full"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <Button
                className="w-full"
                onClick={() => {
                  handleAuthModalOpen();
                  toggleMenu();
                }}
              >
                Login / Register
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal Dialog - This will be controlled by the parent component */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="p-0 max-w-md">
          {/* The actual AuthModal component will be rendered by the parent */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Authentication</h2>
            <p className="text-gray-600 mb-4">
              Please login or register to continue.
            </p>
            <div className="flex justify-end">
              <Button onClick={handleAuthModalClose}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
