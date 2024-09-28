'use client';
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
    const pathname = usePathname();
  return (
    <ul className='md:flex-between flex flex-col w-full items-start gap-5 md:flex-row'>
        {headerLinks.map((link)=>{
            const isActive = pathname == link.route;
            return(
                <li
                    key={link.route}
                    className={`${
                        isActive ? 'bg-red-500 text-transparent bg-clip-text underline-active' : 'text-white'
                    } flex-center p-medium-16 whitespace-nowrap relative`}>                 
                      <style jsx>{`
        .underline-active::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, #fc8181, #f56565, #fc8181); 
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