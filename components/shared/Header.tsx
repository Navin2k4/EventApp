import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
  return (
<header className="bg-[#1e1f23] text-white border-b border-gray-800">
    <div className="wrapper flex items-center justify-between py-4">
        <Link href="/" className="w-36 ">
            <Image 
                src="/assets/images/logo.png" 
                width={110} 
                height={38} 
                alt="Evently Logo"
            />
        </Link>
        <SignedIn>
            <nav className="md:flex-between hidden w-full max-w-xs">
                <NavItems />
            </nav>
        </SignedIn>
        <div className="flex items-center gap-3">
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
                <MobileNav />
            </SignedIn>
            <SignedOut>
                <Button asChild className="rounded-lg bg-[#e41312] hover:bg-[#c00303]text-white size-lg">
                    <Link href="/sign-in">Login</Link>
                </Button>
            </SignedOut>
        </div>
    </div>
</header>

  )
}

export default Header