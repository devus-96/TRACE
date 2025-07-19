import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BadgeColor } from "../custom/badge"
import { logType } from "@/types/global"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

export function LogsTable({
  dataLogs,
  isPaused
}: {
  dataLogs: logType[],
  isPaused: boolean
}) {
  return (
    <Table className="">
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead className="!text-primary"><p className="">Timestamp (Date)</p></TableHead>
          <TableHead className="!text-primary">Host</TableHead>
          <TableHead className="!text-primary">Process / Event</TableHead>
          <TableHead className="!text-primary">Message / Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {dataLogs.map((log, index) => {
          const logObj = {
            Hostname: log['host.hostname'],
            Sources:  log['source'],
            User: log['log.user'],
            'Process Name': log['log.process_name'],
            'Host IP': log['host.ip']
          }
          
          return (
            <Sheet key={index} modal={false}>
              {!isPaused ? (
                <TableRow className="cursor-not-allowed">
                  {/* Contenu sans SheetTrigger */}
                  <TableCell className="text-textColor">
                    <div className="flex items-center space-x-2">
                      <BadgeColor color={
                        log['log.level'] === 'information' ? '#3B99F2' : 
                        log['log.level'] === 'error' ? "#F24B55" : '#F9E36C'
                      } />
                      <p className="font-light">{log.timestamp}</p>
                    </div>  
                  </TableCell>
                  <TableCell className="text-textColor font-light">{log['host.hostname']}</TableCell>
                  <TableCell className="text-textColor font-light">{log['log.process_name']}</TableCell>
                  <TableCell className="text-textColor font-light">{log['log.message']}</TableCell>
                </TableRow>
              ) : (
                <SheetTrigger asChild>
                  <TableRow className="cursor-pointer">
                    {/* Contenu normal */}
                    <TableCell className="text-textColor">
                      <div className="flex items-center space-x-2">
                        <BadgeColor color={
                          log['log.level'] === 'information' ? '#3B99F2' : 
                          log['log.level'] === 'error' ? "#F24B55" : '#F9E36C'
                        } />
                        <p className="font-light">{log.timestamp}</p>
                      </div>  
                    </TableCell>
                    <TableCell className="text-textColor font-light">{log['host.hostname']}</TableCell>
                    <TableCell className="text-textColor font-light">{log['log.process_name']}</TableCell>
                    <TableCell className="text-textColor font-light">{log['log.message']}</TableCell>
                  </TableRow>
                </SheetTrigger>
              )}
              
              {/* SheetContent inchangé */}
              <SheetContent className="sm:max-w-xl text-textColor overflow-auto">
                <SheetHeader className="px-4">
                  <SheetTitle>Log Details</SheetTitle> {/* Ajout du titre requis */}
                  <div className={clsx("rounded-none my-auto h-[10px] whitespace-nowrap", {
                    'bg-[#3B99F2]': log['log.level'] === 'information',
                    'bg-[#F24B55]': log['log.level'] === 'error',
                    'bg-[#F9E36C]': log['log.level'] === 'warning',
                  })}></div>
                </SheetHeader>
                <div className="flex items-center justify-between px-4">
                  <Button className={clsx("rounded-none my-auto w-fit p-2 text-white whitespace-nowrap", {
                    'bg-[#3B99F2]': log['log.level'] === 'information',
                    'bg-[#F24B55]': log['log.level'] === 'error',
                    'bg-[#F9E36C]': log['log.level'] === 'warning',
                  })}>
                    LEVEL: {log['log.level']}
                  </Button>
                  <h1 className="font-semibold">{log.timestamp}</h1>
                </div>
                <p className="text-lg font-semibold ml-4">Data : </p>
                <div className="grid grid-cols-3 grid-rows-2 gap-3 px-3">
                  {Object.entries(logObj).map((item, index) => {
                    return (
                      <div key={index} className="border p-2 rounded space-y-2 text-textColor">
                          <p className="font-light text-sm">{item[0]}</p>
                          <p className="text-sm">{item[1]}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-start justify-start w-full px-3 space-x-4">
                  <p className="text-lg font-semibold ml-4">message: </p>
                  <div className="w-[400px] text-textColor font-light text-sm">
                    <p>{log['log.message']}</p>
                  </div>
                </div>
                <div className="flex items-start justify-start w-full px-3 space-x-4">
                  <p className="text-lg font-semibold ml-4">AI Explain: </p>
                  <div className="w-[400px] text-textColor font-light text-sm">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, placeat ipsum! Placeat pariatur quasi ad necessitatibus at ipsam, est possimus consequatur magni sunt maxime, quaerat dignissimos quisquam laboriosam sequi commodi?</p>
                  </div>
                </div>
                <p className="text-lg font-semibold ml-4">JSON : </p>
                <div className="w-full px-4 mb-4">
                  <div  style={{
                        width: '100%', // ou la largeur désirée
                        wordWrap: 'break-word', // force le retour à la ligne
                        overflowWrap: 'break-word', // alternative moderne
                        whiteSpace: 'normal', // permet les retours à la ligne
                        minHeight: 'initial', // hauteur minimale initiale
                        height: 'auto', // hauteur s'ajuste au contenu
                      }} className="p-8 font-light bg-gray-200 h-fit text-wrap">
                    <p>{JSON.stringify(log)}</p>
                  </div>
                </div>
            </SheetContent>
            </Sheet>
          )
        })}
      </TableBody>
    </Table>
  ) 
}