import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ArtworkItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  region: string;
  isFeatured?: boolean;
  description?: string;
}

interface FeaturedCarouselProps {
  artworks?: ArtworkItem[];
  onViewArtwork?: (id: string) => void;
  onAddToFavorites?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

const FeaturedCarousel = ({
  artworks = [
    {
      id: "1",
      title: "Vibrant Countryside",
      artist: "Maria Santos",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      region: "Visayas",
      isFeatured: true,
      description:
        "A vibrant depiction of rural life in the Philippines, showcasing the lush landscapes and traditional farming methods.",
    },
    {
      id: "2",
      title: "Urban Manila",
      artist: "Juan Dela Cruz",
      price: 18500,
      image:
        "https://images.unsplash.com/photo-1518982380512-5cb02dedd6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      region: "Luzon",
      isFeatured: true,
      description:
        "A modern interpretation of Manila's urban landscape, blending traditional Filipino elements with contemporary city life.",
    },
    {
      id: "3",
      title: "Coastal Dreams",
      artist: "Ana Reyes",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      region: "Mindanao",
      isFeatured: true,
      description:
        "A serene portrayal of the beautiful coastal regions of Mindanao, capturing the tranquility of island life.",
    },
  ],
  onViewArtwork = () => {},
  onAddToFavorites = () => {},
  onAddToCart = () => {},
}: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleViewArtwork = (id: string) => {
    onViewArtwork(id);
  };

  const handleAddToFavorites = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToFavorites(id);
  };

  const handleAddToCart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToCart(id);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Featured Artwork</h2>
        <p className="text-gray-600 mt-1">
          Discover trending Filipino masterpieces
        </p>
      </div>

      <div className="relative">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {artworks.map((artwork) => (
              <CarouselItem key={artwork.id}>
                <Link
                  to={`/product/${artwork.id}`}
                  className="relative overflow-hidden rounded-lg cursor-pointer block"
                  onClick={() => handleViewArtwork(artwork.id)}
                >
                  <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                        onClick={(e) => handleAddToFavorites(artwork.id, e)}
                      >
                        <Heart className="h-5 w-5 text-rose-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                        onClick={(e) => handleAddToCart(artwork.id, e)}
                      >
                        <ShoppingCart className="h-5 w-5 text-primary" />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">
                      {artwork.region}
                    </Badge>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                          {artwork.title}
                        </h3>
                        <p className="text-gray-600">by {artwork.artist}</p>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        ₱{artwork.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-2 text-gray-700 line-clamp-2">
                      {artwork.description}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        className="flex-1"
                        onClick={(e) => {
                          e.preventDefault();
                          handleViewArtwork(artwork.id);
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-2"
                        onClick={(e) => handleAddToCart(artwork.id, e)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 lg:-left-6 bg-white/80 backdrop-blur-sm hover:bg-white/90" />
          <CarouselNext className="-right-4 lg:-right-6 bg-white/80 backdrop-blur-sm hover:bg-white/90" />
        </Carousel>

        <div className="flex justify-center mt-4 gap-1">
          {artworks.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
