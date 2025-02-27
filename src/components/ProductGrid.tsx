import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface Product {
  id: string;
  image: string;
  title: string;
  artist: string;
  price: number;
  region: string;
}

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  onAddToCart?: (id: string) => void;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Vibrant Filipino Landscape",
      artist: "Maria Santos",
      price: 12500,
      region: "Visayas",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Manila Bay Sunset",
      artist: "Juan Reyes",
      price: 9800,
      region: "Luzon",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1552082919-e60010758c47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Tribal Patterns",
      artist: "Ana Diaz",
      price: 15000,
      region: "Mindanao",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1577720643272-265f09367456?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Banaue Rice Terraces",
      artist: "Miguel Cruz",
      price: 18500,
      region: "Luzon",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1578301978018-3199d1b11056?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Tarsier Portrait",
      artist: "Elena Gomez",
      price: 7500,
      region: "Visayas",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Mayon Volcano",
      artist: "Rafael Mendoza",
      price: 14200,
      region: "Luzon",
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Chocolate Hills",
      artist: "Sofia Reyes",
      price: 11000,
      region: "Visayas",
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Jeepney Art",
      artist: "Carlos Bautista",
      price: 8900,
      region: "Luzon",
    },
  ],
  isLoading = false,
  onAddToCart = () => {},
}: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // Change page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[800px] bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-full h-[400px] bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[800px] bg-gray-50 flex flex-col items-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            artist={product.artist}
            price={product.price}
            region={product.region}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center justify-center px-4 py-2 rounded-md bg-white border">
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gray-100 p-3 mb-4">
            <Filter className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
