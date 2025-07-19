"use client"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button";
import { StartPausedBtn } from "@/components/ui/startPauseBtn";
import { AccordionFilter } from "@/components/logs/filterAccordion";
import { LogsTable } from "@/components/logs/logs";
import { CircleX, ListFilter } from 'lucide-react';
import clsx from "clsx";
import { logType } from "@/types/global";
import { useLogsStream } from "@/hook/useLogsStream";

export default function ZeroDayPage () {
    const dataLogRef = useRef<logType[]>([])
    const [data, setData] = useState<logType[]>([])
    const [sort, setSort] = useState({
        host: '',
        source: '',
        log: 'all'
    })
    const { logs, togglePause, isPaused } = useLogsStream('http://localhost:8000/api/events/stream');

    useEffect(() => {
        if (logs.length === 0) return;
    
        let currentIndex = 0;
        const vitesse = 30000; // 3 secondes entre chaque log
    
        const intervalId = setInterval(() => {
            if (currentIndex < logs.length) {
                if (isPaused === false) {
                    setData((prev) => [logs[currentIndex], ...prev].slice(0, 30));
                    dataLogRef.current = [logs[currentIndex], ...dataLogRef.current].slice(0, 30)
                    currentIndex++;
                }
            } else {
                // Arrête l'intervalle quand tous les logs sont affichés
                clearInterval(intervalId);
            }
        }, vitesse);
    
        // Nettoyage de l'intervalle quand le composant est démonté
        return () => clearInterval(intervalId);
    }, [logs, isPaused]);

    return (
       <section className="min-h-screen">
            {/* Filters Bar */}
            <div className="w-full flex flex-col  md:flex-row items-center justify-between py-4 text-textColor px-4 md:px-0 gap-4">
                <div className="w-full  flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-1 w-full md:w-auto">
                        <ListFilter />
                        <div className="w-full md:w-[400px] lg:w-[600px] xl:w-[800px] h-[40px] border px-1 space-x-2 flex items-center overflow-x-auto">
                            {sort.host && 
                            <Button onClick={() => {
                                setSort((prevValue) => {
                                    const newValue = {...prevValue}
                                    newValue['host'] = ''
                                    return newValue
                                  })
                            }} className="bg-gray-600 rounded-none my-auto h-[32px] whitespace-nowrap">
                                <p>HOST: {sort.host}</p>
                                <div className="scale-125"><CircleX size={18} className="cursor-pointer"/></div>
                            </Button>
                            }
                            {sort.log !== 'all' && 
                            <Button onClick={() => {
                                setSort((prevValue) => {
                                    const newValue = {...prevValue}
                                    newValue['log'] = 'all'
                                    return newValue
                                  })
                            }} className={clsx("rounded-none my-auto h-[32px] whitespace-nowrap", {
                                'bg-[#3B99F2]': sort.log === 'information',
                                'bg-[#F24B55]': sort.log === 'error',
                                'bg-[#F9E36C]': sort.log === 'warning',
                            })}>
                                <p>LEVEL: {sort.log}</p>
                                <div className="scale-125 cursor-pointer"><CircleX size={18} className=""/></div>
                            </Button>
                            }
                            {sort.source && 
                            <Button onClick={() => {
                                setSort((prevValue) => {
                                    const newValue = {...prevValue}
                                    newValue['source'] = ''
                                    return newValue
                                  })
                            }} className="bg-gray-600 rounded-none my-auto h-[32px] whitespace-nowrap">
                                <p>SOURCE: {sort.source}</p>
                                <div className="scale-125 cursor-pointer"><CircleX size={18} className=""/></div>
                            </Button>
                            }
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                        <StartPausedBtn togglePause={togglePause} />
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <section className="w-full px-4 md:px-0">
                
                {/* Table and Filters Section */}
                <div className="flex flex-col md:flex-row justify-between w-full px-0 md:px-8 space-y-4 md:space-y-0 md:space-x-8 mt-8">
                    <div className="w-full md:w-[250px]">
                        <AccordionFilter dataLogs={data} log={sort.log} setSort={setSort} isPaused={isPaused} />
                    </div>
                    <div className={`w-full max-h-[500px] overflow-scroll mb-8 border rounded overflow-x-auto`}>
                        <LogsTable dataLogs={data} isPaused={isPaused}  />
                    </div>
                </div>
            </section>
       </section>
    )
}