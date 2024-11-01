import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
    <div className='flex gap-3 items-center'>
      <Image src={'/logo.svg'} width={30} height={30}/> 
      <h2 className='font-bold text-xl'>Videomatic AI</h2>
    </div>
    <div className='flex gap-3 items-center'>
      <button  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dashboard</button>
      <UserButton/>
    </div>
    </div>
  )
}

export default Header