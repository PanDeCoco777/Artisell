import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Clock, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface OrderConfirmationProps {
  orderNumber?: string;
  orderDate?: string;
  estimatedDelivery?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  items?: Array<{
    id: string;
    title: string;
    artist: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
}

const OrderConfirmation = ({
  orderNumber = "ART-12345-6789",
  orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  estimatedDelivery = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  shippingAddress = "123 Filipino Art Street, Makati City, Metro Manila, 1200",
  paymentMethod = "Credit Card",
  items = [
    {
      id: "1",
      title: "Vibrant Filipino Landscape",
      artist: "Maria Santos",
      price: 12500,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "2",
      title: "Urban Manila",
      artist: "Juan Dela Cruz",
      price: 18500,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1518982380512-5cb02dedd6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ],
  subtotal = 31000,
  shipping = 250,
  tax = 3720,
  total = 34970,
}: OrderConfirmationProps) => {
  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">
                Order Number
              </h2>
              <p className="font-semibold">{orderNumber}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">
                Order Date
              </h2>
              <p className="font-semibold">{orderDate}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">
                Estimated Delivery
              </h2>
              <p className="font-semibold">{estimatedDelivery}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">
                Payment Method
              </h2>
              <p className="font-semibold">{paymentMethod}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
            <Home className="h-5 w-5 text-gray-500 mt-0.5" />
            <p>{shippingAddress}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b pb-4 last:border-0"
              >
                <div className="w-20 h-20 rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">by {item.artist}</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm">Qty: {item.quantity}</p>
                    <p className="font-bold">
                      ₱{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>₱{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₱{tax.toLocaleString()}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₱{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Tracking Information</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-8 relative">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Order Confirmed</h3>
                  <p className="text-sm text-gray-600">{orderDate}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
                  <Package className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">Order Processing</h3>
                  <p className="text-sm text-gray-600">In progress</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
                  <Truck className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">Order Shipped</h3>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
                  <Home className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">Order Delivered</h3>
                  <p className="text-sm text-gray-600">
                    Estimated: {estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/profile/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
