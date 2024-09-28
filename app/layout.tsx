import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight:['400','500','600','700'],
  variable:'--font-poppins',
});

export const metadata: Metadata = {
  title: "Zen Dev's Eventify",
  description: "It is a platform for college event management",
  icons:{
    icon: '/assets/images/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className='scroll-smooth' style={{scrollBehavior:'smooth'}} suppressHydrationWarning>
      <body className={poppins.variable}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
