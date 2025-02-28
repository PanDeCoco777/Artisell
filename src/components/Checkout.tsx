import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Truck, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface CartItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutProps {
  cartItems?: CartItem[];
  onPlaceOrder?: (formData: any) => void;
}

const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  region: z.string().min(2, { message: "Region is required" }),
  postalCode: z.string().min(4, { message: "Postal code is required" }),
  paymentMethod: z.enum(["credit_card", "gcash", "bank_transfer", "cod"]),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = ({
  cartItems = [
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
  onPlaceOrder = () => {},
}: CheckoutProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      postalCode: "",
      paymentMethod: "credit_card",
      notes: "",
    },
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 250; // Fixed shipping rate
  const tax = subtotal * 0.12; // 12% tax
  const total = subtotal + shipping + tax;

  const handleSubmit = (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onPlaceOrder(values);
      navigate("/order-confirmation");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 flex items-center gap-1"
        onClick={() => navigate("/cart")}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </Button>

      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan Dela Cruz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="juan@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+63 912 345 6789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Filipino Art Street"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Makati City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Input placeholder="Metro Manila" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="1200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem
                              value="credit_card"
                              id="credit_card"
                            />
                            <label
                              htmlFor="credit_card"
                              className="flex flex-1 items-center gap-2 cursor-pointer"
                            >
                              <CreditCard className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">Credit Card</p>
                                <p className="text-sm text-gray-500">
                                  Pay with Visa, Mastercard, or JCB
                                </p>
                              </div>
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="gcash" id="gcash" />
                            <label
                              htmlFor="gcash"
                              className="flex flex-1 items-center gap-2 cursor-pointer"
                            >
                              <div className="h-5 w-5 text-blue-500 font-bold text-center">
                                G
                              </div>
                              <div>
                                <p className="font-medium">GCash</p>
                                <p className="text-sm text-gray-500">
                                  Pay with your GCash account
                                </p>
                              </div>
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem
                              value="bank_transfer"
                              id="bank_transfer"
                            />
                            <label
                              htmlFor="bank_transfer"
                              className="flex flex-1 items-center gap-2 cursor-pointer"
                            >
                              <CreditCard className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">Bank Transfer</p>
                                <p className="text-sm text-gray-500">
                                  Pay via bank transfer
                                </p>
                              </div>
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="cod" id="cod" />
                            <label
                              htmlFor="cod"
                              className="flex flex-1 items-center gap-2 cursor-pointer"
                            >
                              <Truck className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">Cash on Delivery</p>
                                <p className="text-sm text-gray-500">
                                  Pay when you receive your order
                                </p>
                              </div>
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Additional Information
                </h2>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Special instructions for delivery or any other notes"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="lg:hidden">
                <OrderSummary
                  cartItems={cartItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />
              </div>

              <Button
                type="submit"
                className="w-full lg:w-auto"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Processing</span>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="hidden lg:block">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary = ({
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) => {
  return (
    <div className="border rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-4 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium line-clamp-1">{item.title}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              <p className="font-bold text-primary">
                ₱{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
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
          <span className="text-gray-600">Tax (12%)</span>
          <span>₱{tax.toLocaleString()}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₱{total.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-6 bg-gray-50 p-4 rounded-md">
        <div className="flex items-start gap-2">
          <Check className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <p className="font-medium">Secure Checkout</p>
            <p className="text-sm text-gray-600">
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
