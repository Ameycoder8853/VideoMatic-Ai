import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
  } from "./alert-dialog"
import Image from 'next/image'
  

const CustomLoading = ({loading}) => {
  return (
    <AlertDialog open={loading}>
  <AlertDialogContent className="bg-white">
        <div className='bg-white flex flex-col items-center my-10 justify-center'>
          <Image src={'/progress.gif'} width={100} height={100}/>
            <h2>Generating your video... Do not reload</h2>
        </div>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default CustomLoading