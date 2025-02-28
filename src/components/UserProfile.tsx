import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Package, User, CreditCard, LogOut } from "lucide-react";

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
  };
  orders?: Array<{
    id: string;
    date: string;
    status: "processing" | "shipped" | "delivered" | "cancelled";
    total: number;
    items: number;
  }>;
  onUpdateProfile?: (data: any) => void;
  onLogout?: () => void;
}

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postalCode: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = ({
  user = {
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "+63 912 345 6789",
    address: "123 Filipino Art Street",
    city: "Makati City",
    region: "Metro Manila",
    postalCode: "1200",
  },
  orders = [
    {
      id: "ART-12345",
      date: "May 15, 2023",
      status: "delivered" as const,
      total: 12500,
      items: 1,
    },
    {
      id: "ART-12346",
      date: "June 2, 2023",
      status: "shipped" as const,
      total: 18500,
      items: 1,
    },
    {
      id: "ART-12347",
      date: "July 10, 2023",
      status: "processing" as const,
      total: 31000,
      items: 2,
    },
  ],
  onUpdateProfile = () => {},
  onLogout = () => {},
}: UserProfileProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      region: user.region,
      postalCode: user.postalCode,
    },
  });

  const handleSubmit = (values: ProfileFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onUpdateProfile(values);
      setIsSubmitting(false);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            Processing
          </span>
        );
      case "shipped":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Account</h1>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" /> Orders
            </TabsTrigger>
            <TabsTrigger
              value="payment-methods"
              className="flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" /> Payment Methods
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">
                Personal Information
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <h2 className="text-xl font-semibold mb-6">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
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
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Saving</span>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Order History</h2>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No orders yet</h3>
                  <p className="text-gray-500 mt-1">
                    When you place orders, they will appear here.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/">Start Shopping</a>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left">Order ID</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Items</th>
                        <th className="px-4 py-3 text-right">Total</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">{order.id}</td>
                          <td className="px-4 py-4">{order.date}</td>
                          <td className="px-4 py-4">
                            {getStatusBadge(order.status)}
                          </td>
                          <td className="px-4 py-4">{order.items}</td>
                          <td className="px-4 py-4 text-right font-medium">
                            ₱{order.total.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Button variant="link" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="payment-methods">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">
                  No payment methods saved
                </h3>
                <p className="text-gray-500 mt-1">
                  Add a payment method for faster checkout.
                </p>
                <Button className="mt-4">Add Payment Method</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
