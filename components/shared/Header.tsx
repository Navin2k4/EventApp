import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import { Button } from '../ui/button'
import { CalendarDays, LogIn, Search, Bell } from 'lucide-react'

const Header = () => {
  return (
    <header className="">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1014]/95 to-[#0f1014]/80 backdrop-blur-md border-b border-white/5" />

      <div className="relative">
        {/* Top Bar - Optional Announcements */}
        <div className="bg-gradient-to-r from-[#e41312] via-[#ff4b48] to-[#e41312] text-white">
          <div className="container mx-auto px-6 py-1.5">
            <p className="text-sm text-center font-medium">
              🎉 Create your first event today and get special benefits!
              <Link href="/events/create" className="ml-2 underline hover:no-underline">
                Start now
              </Link>
            </p>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Section: Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="shrink-0">
                <Image
                  src='/assets/images/logo.png'
                  height={32}
                  width={120}
                  alt='Eventify'
                  className="object-contain"
                />
              </Link>

              {/* Desktop Navigation */}
              <SignedIn>
                <nav className="hidden md:flex items-center gap-1">
                  <NavItems />
                </nav>
              </SignedIn>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-white/5 text-gray-400 hover:text-white"
              >
                <Search className="w-5 h-5" />
              </Button>

              <SignedIn>
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex hover:bg-white/5 text-gray-400 hover:text-white"
                >
                  <Bell className="w-5 h-5" />
                </Button>

                {/* Create Event Button */}
                <Button
                  asChild
                  className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10"
                >
                  <Link href="/events/create">
                    <CalendarDays className="w-4 h-4" />
                    <span>Create Event</span>
                  </Link>
                </Button>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-3 ml-3 border-l border-white/10">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "h-9 w-9"
                      }
                    }}
                  />
                  {/* Mobile Navigation */}
                  <div className="md:hidden">
                    <MobileNav />
                  </div>
                </div>
              </SignedIn>

              <SignedOut>
                <Button
                  asChild
                  className="bg-white hover:bg-white/90 text-[#e41312] font-medium"
                >
                  <Link href="/sign-in" className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                </Button>
              </SignedOut>
            </div>
          </div>
        </div>

        {/* Active Link Indicator - Optional */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e41312] to-transparent opacity-50" />
      </div>
    </header>
  )
}

export default Header
