import { Facebook, Instagram, Twitter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1e1f23] py-8">
      <div className="wrapper text-white flex flex-col items-center sm:flex-row justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-white"
        >
          <Image 
            src='/assets/images/logo.png'
            height={20}
            width={150}
            alt='Eventify'
          />         </Link>

        <div className="flex gap-4">
          <Link href="https://facebook.com" aria-label="Facebook">
            <Facebook />
          </Link>
          <Link href="https://twitter.com" aria-label="Twitter">
            <X />
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram">
            <Instagram />
          </Link>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="mt-8 border-t border-gray-700">
        <p className="text-center text-sm text-gray-500 py-4">
          © 2023 Zen Dev's Eventify, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
