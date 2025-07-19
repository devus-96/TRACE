"use client"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button";
import { StartPausedBtn } from "@/components/ui/startPauseBtn";
import { AccordionFilter } from "@/components/logs/filterAccordion";
import { LogsTable } from "@/components/logs/logs";
import { CircleX, ListFilter } from 'lucide-react';
import clsx from "clsx";
import { Search } from "lucide-react";
import { logType } from "@/types/global";
import { useLogsStream } from "@/hook/useLogsStream";
import EventChart from "@/components/logs/eventChart";

interface MinuteCount {
    timestamp: Date;
    count: number;
  }

export default function LogPage () {
    const dataLogRef = useRef<logType[]>([])
    const [eventData, setEventData] = useState<MinuteCount[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<logType[]>([])
    const [sort, setSort] = useState({
        host: '',
        source: '',
        log: 'all'
    })
    const [isMobile, setIsMobile] = useState(false)
    const { logs, togglePause, isPaused } = useLogsStream('http://localhost:8000/api/events/stream');

    useEffect(() => {
        if (logs.length === 0) return;
    
        let currentIndex = 0;
        const vitesse = 3000; // 3 secondes entre chaque log
    
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        handleResize() // Vérifier au chargement initial
        window.addEventListener('resize', handleResize)
        
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:8000/api/events');
              const data: MinuteCount[] = await response.json();
              // Convertir les timestamp strings en Date objects
              const formattedData = data.map(item => ({
                ...item,
                timestamp: new Date(item.timestamp)
              }));
              setEventData(formattedData);
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching event data:', error);
              setIsLoading(false);
            }
          };
        // Récupérer les données initiales
        fetchData();

        // Configurer un intervalle pour rafraîchir les données toutes les 10 secondes
        const intervalId = setInterval(fetchData, 10000);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect (() => {
        console.log(sort)
        let sortTab =  dataLogRef.current as logType[]
        if (sort.log !== 'all') {
            sortTab = sortTab.filter((item) => item["log.level"] === sort.log)
        }

        if (sort.host) {
            sortTab = sortTab.filter((item) => item["host.hostname"] === sort.host)
        }

        if (sort.source) {
            sortTab = sortTab.filter((item) => item["source"] === sort.source)
        }

        if ((sort.log === 'all' && !sort.host) && !sort.source) {
            sortTab = dataLogRef.current
        }
        console.log(sortTab)
        setData(sortTab)
    }, [sort])

    return (
       <section className="min-h-screen">
            {/* Header */}
            <div className="border-b flex items-center space-x-2 py-2 px-4 md:px-8">
                <Search /> 
                <p className="font-semibold">Logs Explorer</p>
            </div>
            
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
                    {!isMobile && (
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <StartPausedBtn togglePause={togglePause} />
                        </div>
                    )}
                </div>
                {isMobile && (
                    <div className="w-full flex justify-end items-center space-x-2 whitespace-nowrap">
                        <StartPausedBtn togglePause={togglePause} />
                    </div>
                )}
            </div>
            
            {/* Main Content */}
            <section className="w-full px-4 md:px-0">
                <div className="max-w-[1200px] p-1 m-auto">
                    <div className="chart-container" style={{ height: '200px', width: '100%' }}>
                        {isLoading ? (
                        <p>Chargement des données...</p>
                        ) : eventData.length > 0 ? (
                        <EventChart data={eventData} />
                        ) : (
                        <p>Aucune donnée disponible</p>
                        )}
                    </div>
                </div>
                
                {/* Table and Filters Section */}
                <div className="flex flex-col md:flex-row justify-between w-full px-0 md:px-8 space-y-4 md:space-y-0 md:space-x-8 mt-8">
                    {!isMobile && (
                        <div className="w-full md:w-[250px]">
                            <AccordionFilter dataLogs={data} log={sort.log} setSort={setSort} isPaused={isPaused} />
                        </div>
                    )}
                    <div className={`w-full max-h-[500px] overflow-scroll mb-8 ${isMobile ? '' : 'md:w-[calc(100%-250px)]'} border rounded overflow-x-auto`}>
                        <LogsTable dataLogs={data} isPaused={isPaused}  />
                    </div>
                    {isMobile && (
                        <div className="w-full">
                            <AccordionFilter dataLogs={data} log={sort.log} setSort={setSort} isPaused={isPaused} />
                        </div>
                    )}
                </div>
            </section>
       </section>
    )
}