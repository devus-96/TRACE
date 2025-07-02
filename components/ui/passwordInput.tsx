"use client"
import React from "react"
import { ChangeEvent, useState } from "react"
import { Eye, EyeOff } from 'lucide-react';
import clsx from "clsx";

export const InputPasswrd = (
    {
        placeholder = "", 
        name, 
        handle,
        state = undefined,
        ...props
    }: {
        placeholder?: string, 
        name: string, 
        state?: string,
        handle?: (e: ChangeEvent<HTMLInputElement>) => void
    }) => {
    const [open, setOpen] = useState(true)
    return <div className={clsx("w-full flex items-center justify-between border border-primary pl-4", {
                                "border border-red-500" : state !== undefined,
                                "border border-[#33475B]" : state === undefined
                            })}>
                <input 
                    type={open ? "password" : "text"} 
                    name={name}
                    className="outline-none py-2 w-[90%] text-sm placeholder:text-gray-500" 
                    placeholder={placeholder} 
                    onChange={(e) => handle && handle(e)}
                    {...props}
                />
                <div className="w-[10%] h-[36px] border-l border-primary flex items-center justify-center">
                    {open ? (
                        <EyeOff size={20} className="cursor-pointer" onClick={() => setOpen(false)} />
                    ):  <Eye size={20} className="cursor-pointer" onClick={() => setOpen(true)} />}
                </div>
            </div>
}