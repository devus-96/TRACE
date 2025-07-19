import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { BadgeColor } from "../custom/badge"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { logType } from "@/types/global"
import clsx from "clsx"
  
export function AccordionFilter({
    log,
    setSort,
    dataLogs,
    isPaused
  }:{
    log: string,
    setSort: Dispatch<SetStateAction<{
      host: string,
      source: string,
      log: string,
  }>>
    dataLogs: logType[],
    isPaused: boolean
  }) {
    const [sources, setSouces] = useState<string[]>([])
    const [hosts, setHost] = useState<string[]>([])
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLFormElement
      setSort((prevValue) => {
        const newValue = {...prevValue}
        newValue['log'] = target.value
        return newValue
      })
    }

    useEffect(() => {
      if (dataLogs[0]) {
        if (!hosts.includes(dataLogs[0]['host.hostname'])) {
          setHost((prev) => [dataLogs[0]['host.hostname'], ...prev])
        }
        if (!sources.includes(dataLogs[0]['source'])) {
          setSouces((prev) => [dataLogs[0]['source'], ...prev])
        }
      }
    }, [dataLogs])

    return (
      <Accordion
        type="single"
        collapsible
        className="w-full border text-primary rounded"
        defaultValue=""
      >
        <div className="border-b px-4">
          <div className="border-b-2 border-secondary w-fit pt-4">
            <p className="font-semibold text-xl">Filter</p>
          </div>
        </div>
        <AccordionItem value="item-1" disabled={!isPaused}>
          <AccordionTrigger className={clsx("px-4", {
            isPaused: "cursor-not-allowed"
          })}>
            <div className="flex items-center space-x-1">
              <BadgeColor color='#8DE8A6' />
              <p className="text-lg text-semibold">Host</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <ul className="pl-8 list-disc">
              {hosts.map((item, index) => {
                  return <div key={index}>
                      <li key={index} onClick={(e) => {
                        const target = e.target as HTMLFormElement
                        setSort((prevValue) => {
                          const newValue = {...prevValue}
                          newValue['host'] = target.innerText
                          return newValue
                        })
                      }} className="font-light p-1 cursor-pointer hover:underline">{item}</li>
                  </div>
                  
                })}
             </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled={!isPaused}>
          <AccordionTrigger className={clsx("px-4", {
              isPaused: "cursor-not-allowed"
            })}>
            <div className="flex items-center space-x-1">
              <BadgeColor color='#8DE8A6' />
              <p className="text-lg text-semibold">Sources</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <ul className="pl-8 list-disc">
              {sources.map((item, index) => (
                  <li key={index} onClick={(e) => {
                    const target = e.target as HTMLFormElement
                    setSort((prevValue) => {
                      const newValue = {...prevValue}
                      newValue['source'] = target.innerText
                      return newValue
                    })
                  }} className="font-light p-1 cursor-pointer hover:underline">{item}</li>
              ))}
             </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" disabled={!isPaused}>
          <AccordionTrigger className={clsx("px-4", {
              isPaused: "cursor-not-allowed"
            })}>
            <div className="flex items-center space-x-1">
              <BadgeColor color='#8DE8A6' />
              <p className="text-lg text-semibold">Log level</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <RadioGroup defaultValue="all"className="pl-8">
              <div className="flex items-center gap-3">
                <RadioGroupItem checked={log === 'all'} onClick={(e) => handleClick(e)} value="all" id="r1" />
                <Label htmlFor="r1" className="text-textColor font-light">All</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem checked={log === 'warning'} onClick={(e) => handleClick(e)} value="warning" id="r2" />
                <Label htmlFor="r2" className="text-textColor font-light">Warning</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem checked={log === 'error'} onClick={(e) => handleClick(e)} value="error" id="r3" />
                <Label htmlFor="r3" className="text-textColor font-light">Error</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem checked={log === 'information'} onClick={(e) => handleClick(e)} value="information" id="r3" />
                <Label htmlFor="r3" className="text-textColor font-light">Information</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  