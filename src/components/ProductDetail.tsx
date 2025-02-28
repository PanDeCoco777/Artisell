import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Share2,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ProductDetailProps {
  id?: string;
  title?: string;
  artist?: string;
  price?: number;
  images?: string[];
  description?: string;
  region?: string;
  medium?: string;
  dimensions?: string;
  year?: number;
  inStock?: boolean;
  onAddToCart?: (id: string, quantity: number) => void;
  onAddToFavorites?: (id: string) => void;
}

const ProductDetail = ({
  id = "1",
  title = "Vibrant Filipino Landscape",
  artist = "Maria Santos",
  price = 12500,
  images = [
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518982380512-5cb02dedd6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ],
  description = "A vibrant depiction of rural life in the Philippines, showcasing the lush landscapes and traditional farming methods. This artwork captures the essence of Filipino countryside with its rich colors and detailed brushwork.",
  region = "Visayas",
  medium = "Oil on Canvas",
  dimensions = "24 x 36 inches",
  year = 2023,
  inStock = true,
  onAddToCart = () => {},
  onAddToFavorites = () => {},
}: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
    navigate("/cart");
  };

  const handleAddToFavorites = () => {
    onAddToFavorites(id);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 flex items-center gap-1"
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-4 w-4" /> Back to browsing
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-gray-50">
            <img
              src={images[selectedImage]}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 overflow-hidden rounded-md border ${selectedImage === index ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${title} - view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{region}</Badge>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg text-gray-600">by {artist}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-primary">
              ₱{price.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddToFavorites}
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="flex h-8 w-12 items-center justify-center border-y border-input bg-background">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Button
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  onAddToCart(id, quantity);
                  navigate("/checkout");
                }}
                disabled={!inStock}
              >
                Buy Now
              </Button>
            </div>

            {!inStock && (
              <p className="text-sm text-destructive">
                This artwork is currently out of stock. Please check back later
                or contact the artist directly.
              </p>
            )}
          </div>

          <Separator />

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-gray-700">{description}</p>
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Medium</span>
                  <span>{medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dimensions</span>
                  <span>{dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Year</span>
                  <span>{year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Region</span>
                  <span>{region}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-4">
                <p>
                  All artwork is carefully packaged to ensure safe delivery.
                  Shipping typically takes 3-5 business days within the
                  Philippines and 10-14 business days for international orders.
                </p>
                <p>
                  For fragile or large pieces, special handling fees may apply.
                  Please contact us for custom shipping arrangements.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
