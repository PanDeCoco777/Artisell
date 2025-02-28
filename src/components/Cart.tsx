import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface CartItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const Cart = ({
  items = [
    {
      id: "1",
      title: "Vibrant Filipino Landscape",
      artist: "Maria Santos",
      price: 12500,
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      quantity: 1,
    },
    {
      id: "2",
      title: "Urban Manila",
      artist: "Juan Dela Cruz",
      price: 18500,
      image:
        "https://images.unsplash.com/photo-1518982380512-5cb02dedd6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      quantity: 1,
    },
  ],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
}: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setSubtotal(total);
  }, [cartItems]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="rounded-full bg-gray-100 p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
            <ShoppingCart className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any artwork to your cart yet.
          </p>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4"
              >
                <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">by {item.artist}</p>
                    </div>
                    <p className="font-bold text-primary">
                      ₱{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="flex h-8 w-12 items-center justify-center border-y border-input bg-background">
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="text-white"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Estimated Total</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
            </div>
            <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
            <p className="text-xs text-center text-gray-500 mt-4">
              Secure checkout powered by Artisell. Your payment information is
              encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
