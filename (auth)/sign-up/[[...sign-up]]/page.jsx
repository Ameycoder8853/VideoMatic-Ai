import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export default function page () {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
    <div>
        <Image src={'/login.jpg'} alt='login' width='500' height='500' className='w-full object-contain'/>
    </div>
    <div className='flex justify-center items-center h-screen'>   
    <SignUp/>
        </div>
  </div>
  )
}
