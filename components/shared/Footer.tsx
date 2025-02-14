import { Facebook, Instagram, Twitter, X, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#0f1014] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src='/assets/images/logo.png'
                height={24}
                width={120}
                alt='Eventify'
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier platform for creating and managing unforgettable events.
              Connect, celebrate, and create memories with Eventify.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#e41312]/10 hover:text-[#e41312] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="https://twitter.com"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#e41312]/10 hover:text-[#e41312] transition-colors"
                aria-label="Twitter"
              >
                <X className="w-4 h-4" />
              </Link>
              <Link
                href="https://instagram.com"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#e41312]/10 hover:text-[#e41312] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Create Event', href: '/events/create' },
                { label: 'All Events', href: '/events' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#e41312] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@eventify.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#e41312] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@eventify.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#e41312] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>123 Event Street, Digital City, 12345</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#e41312]/50 text-white placeholder:text-gray-500"
              />
              <Button
                type="submit"
                className="w-full bg-[#e41312] hover:bg-[#c00303] text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Eventify. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-[#e41312] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-[#e41312] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
