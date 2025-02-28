import React from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  image?: string;
  title?: string;
  artist?: string;
  price?: number;
  region?: string;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  title = "Vibrant Filipino Landscape",
  artist = "Maria Santos",
  price = 12500,
  region = "Visayas",
  onAddToCart = () => {},
  onViewDetails = () => {},
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(id);
  };

  const handleViewDetails = () => {
    onViewDetails(id);
  };

  return (
    <Card className="w-full max-w-[320px] h-[400px] overflow-hidden flex flex-col bg-white group">
      <Link
        to={`/product/${id}`}
        onClick={handleViewDetails}
        className="flex flex-col flex-1"
      >
        <div className="relative w-full h-[220px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {region}
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="sm" className="gap-1">
              <Eye size={16} />
              View Details
            </Button>
          </div>
        </div>

        <CardHeader className="p-4 pb-0">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-600">by {artist}</p>
        </CardHeader>

        <CardContent className="p-4 pt-2 flex-grow">
          <p className="text-lg font-bold text-primary">
            ₱{price.toLocaleString()}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
