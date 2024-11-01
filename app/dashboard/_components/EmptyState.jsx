"use client"
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dotted '>
        <h2>You don't have any video generated</h2>

        <Link href={'/dashboard/create-new'}>
        <button  type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Generate New Video</button>
        </Link>
    </div>
  )
}

export default EmptyState