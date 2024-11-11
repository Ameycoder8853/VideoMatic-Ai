import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select"

const SelectDuration = ({onUserSelect}) => {
  return (
    <div className='mt-7'>
    <h2 className='font-bold text-xl text-primary'>Duration</h2>
    <p className='text-gray-500'>Select the Duration of your video</p>
    <Select onValueChange={(value)=>{
        value!='Custom Prompt'&&onUserSelect('duration',value)

        }}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
            <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value='30 seconds'>60 Seconds</SelectItem>


        </SelectContent>
    </Select></div>
  )
}

export default SelectDuration
