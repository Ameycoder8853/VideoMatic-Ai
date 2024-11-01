"use client"
import { Textarea } from "./Textarea"

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select"


const SelectTopic = ({onUserSelect}) => {
    const options=['Custom Prompt','Random AI Story','Scary Story','Historial Facts', 'Motivational', 'Fun Facts']
    const [selectedOption,setSelectedOption]=useState();
    return (
        <div>
            <h2 className='font-bold text-xl text-primary'>Content</h2>
            <p className='text-gray-500'>What is the Topic of your video??</p>
            <Select onValueChange={(value)=>{
                setSelectedOption(value)
                value!='Custom Prompt'&&onUserSelect('topic',value)
                }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((item,index)=>(
                    <SelectItem value={item}>{item}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedOption=='Custom Prompt'&&
            <Textarea className="mt-3"
            onChange={(e)=>onUserSelect('topic',e.target.value) }
            placeholder='Write Prompt to on which you want to generate video'/>}

        </div>
    )
}

export default SelectTopic
