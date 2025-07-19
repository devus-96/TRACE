"use client"
import React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export const CustomSelect = ({
    type,
    placeholder,
    elements
}:{
    type: string,
    placeholder: string,
    elements: string[]
}) => {
    return (
        <div className="flex items-center justify-between space-x-2 bg-[#979797] w-[180px]">
        <div className=''>
            <p className="ml-4">{type}</p>
        </div>
        <Select>
            <SelectTrigger className="w-[150px] bg-white rounded-none">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup defaultValue={placeholder}>
                    {elements.map((item, index) => (
                        <div key={index}>
                            <SelectItem value={item}>{item}</SelectItem>
                        </div>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
    )
}