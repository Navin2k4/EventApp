import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Separator } from "@/components/ui/separator"

import Image from "next/image"
import NavItems from "./NavItems"
  
const MobileNav = () => {
  return (
    <nav className="md:hidden">
        <Sheet>
        <SheetTrigger className="align-middle">
            <Image 
                src='/assets/icons/menu.svg'
                alt="menu"
                width={24}
                height={24}
                className="cursor-pointer"
            />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 text-whitw bg-[#1e1f23]/20 backdrop-blur-md border-l border-white/30 rounded-2xl shadow-lg md:hidden">
        <Image 
                src='/assets/images/logo.png'
                alt="logo"
                height={38}
                width={128}
            />
            <Separator />
            <NavItems/>
        </SheetContent>
        </Sheet>
    </nav>
  )
}

export default MobileNav