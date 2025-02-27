import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface FooterProps {
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
}

const Footer = ({
  companyName = "Artisell",
  companyAddress = "123 Filipino Art Street, Makati City, Philippines",
  companyEmail = "contact@artisell.com",
  companyPhone = "+63 (2) 8123 4567",
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "All Artwork", href: "/shop" },
        { name: "Featured Artists", href: "/artists" },
        { name: "New Arrivals", href: "/new" },
        { name: "Best Sellers", href: "/best-sellers" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Filipino Art", href: "/filipino-art" },
        { name: "Blog", href: "/blog" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Shipping & Returns", href: "/shipping" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Twitter size={20} />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Youtube size={20} />,
      href: "https://youtube.com",
      label: "YouTube",
    },
  ];

  return (
    <footer className="w-full bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">{companyName}</h2>
            </div>
            <p className="text-sm mb-6">
              Supporting Filipino artists and bringing local artwork to the
              global stage.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-primary" />
                <span className="text-sm">{companyAddress}</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <a
                  href={`mailto:${companyEmail}`}
                  className="text-sm hover:text-primary"
                >
                  {companyEmail}
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <a
                  href={`tel:${companyPhone.replace(/\s+/g, "")}`}
                  className="text-sm hover:text-primary"
                >
                  {companyPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-2 md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Join Our Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to receive updates on new artwork, artists, and
              exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-grow"
              />
              <Button type="button">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © {currentYear} {companyName}. All rights reserved.
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="text-gray-600 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
