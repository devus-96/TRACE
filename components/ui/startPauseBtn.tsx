"use client"
import React, { useState } from "react"
import { Pause, Play } from "lucide-react"

export function StartPausedBtn ({
    togglePause
}:{
    togglePause: () => void
}) {
    const [start, setStart] = useState(true)
    return (
        <div className="flex items-center space-x-2 whitespace-nowrap">
            <p>{start ? 'Pause live tail' : 'live tail'}</p>
            <div className="w-5 h-5 cursor-pointer text-white rounded bg-secondary flex items-center justify-center" onClick={() => {
                if (start) {
                    setStart(false)
                } else {
                    setStart(true)
                }
            }}>
                <div className="m-auto" onClick={() => {
                    togglePause()
                }}>
                    {start ? <Pause size={12}/> : <Play size={12} />}
                </div>
            </div>
        </div>
    )
}

