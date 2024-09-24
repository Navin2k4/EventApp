'use client';
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
    const pathname = usePathname();
  return (
    <ul className='md:flex-between flex w-full items-start gap-5 md:flex-row'>
        {headerLinks.map((link)=>{
            const isActive = pathname == link.route;
            return(
                <li
                    key={link.route}
                    className={`${
                        isActive ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-400 text-transparent bg-clip-text underline-active' : 'text-white'
                    } flex-center p-medium-16 whitespace-nowrap relative`}>                 
                      <style jsx>{`
        .underline-active::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px; /* Adjust as needed */
          width: 100%;
          height: 2px; /* Adjust as needed */
          background: linear-gradient(to right, #fc8181, #f56565, #fc8181); /* Red gradient */
        }
      `}</style>
                    <Link href={link.route}>{link.label}</Link>
                </li>
            )
        })}
    </ul>
  )
}

export default NavItems