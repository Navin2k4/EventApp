import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t bg-[#1e1f23]'>
      <div className='flex-center wrapper text-white flex-between flex-container flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href=''>
          <Image 
            src='/assets/images/logo.png'
            alt='logo'
            width={128}
            height={38}
          />
        </Link>
        <p>
          2023 Evently All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer