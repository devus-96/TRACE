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
  import clsx from "clsx"
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "../custom/customSelect";
import { signalType } from "@/types/global";

  
  export function InboxTable({
    dataInbox,
  }: {
    dataInbox: signalType[],
  }) {
    return (
      <Table className="">
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead className="!text-primary"><p className="">Security</p></TableHead>
            <TableHead className="!text-primary">Types</TableHead>
            <TableHead className="!text-primary">Issue</TableHead>
            <TableHead className="!text-primary">Host</TableHead>
            <TableHead className="!text-primary">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {dataInbox.map((log, index) => (
              <Sheet key={index} modal={false}>
                  <SheetTrigger asChild>
                    <TableRow className="cursor-pointer">
                      {/* Contenu normal */}
                      <TableCell className="text-textColor">
                            <div className={clsx('h-[24px] w-[100px] flex items-center justify-center px-1 text-white', {
                                'bg-[#C31A1A]' : log['severity'] === 'critical',
                                'bg-[#E70C41]' : log['severity'] === 'high',
                                'bg-[#E8A700]' : log['severity'] === 'medium',
                                'bg-[#238306]' : log['severity'] === 'low'
                            })}>
                                <p className="uppercase">{log['severity']}</p>
                            </div>
                        </TableCell>
                      <TableCell className="text-textColor font-light">{log['type']}</TableCell>
                      <TableCell className="text-textColor font-light">{log['technique_name']}</TableCell>
                      <TableCell className="text-textColor font-light">{log['hostname']}</TableCell>
                      <TableCell className="text-textColor font-light">{log['timestamp']}</TableCell>
                    </TableRow>
                  </SheetTrigger>
                    <SheetContent className="sm:max-w-2xl text-textColor overflow-auto">
                      <SheetHeader className="px-4 space-y-4">
                        <SheetTitle>
                          <div className={clsx("rounded-none my-auto h-[10px] whitespace-nowrap", {
                              'bg-[#C31A1A]' : log['severity'] === 'critical',
                              'bg-[#E70C41]' : log['severity'] === 'high',
                              'bg-[#E8A700]' : log['severity'] === 'medium',
                              'bg-[#238306]' : log['severity'] === 'low'
                            })}></div></SheetTitle> 
                          <div className="w-[95%] flex items-center">
                            <div className={clsx('h-[24px] w-[100px] flex items-center justify-center px-1 text-white', {
                                  'bg-[#C31A1A]' : log['severity'] === 'critical',
                                  'bg-[#E70C41]' : log['severity'] === 'high',
                                  'bg-[#E8A700]' : log['severity'] === 'medium',
                                  'bg-[#238306]' : log['severity'] === 'low'
                              })}>
                                  <p className="uppercase">{log['severity']}</p>
                              </div>
                              <h1 className="font-semibold ml-4 overflow-hidden text-ellipsis whitespace-nowrap">{log['title']}</h1>
                          </div>
                          <div className="w-full flex justify-between items-center">
                              <div className='flex'>
                                <p className="text-[#979797]">RISK: </p>
                                <div className="bg-[#E894A8] text-[#CB1C46] ml-4 flex justify-center items-center px-1">
                                  <p className="text-xs font-semibold">{log['risk']}</p>
                                </div>
                              </div>
                              <div className='flex'>
                                <p className="text-[#979797]">Timestamp: </p>
                                <div className="">
                                  <p className="ml-4 font-light">{log['timestamp']}</p>
                                </div>
                              </div>
                          </div>
                          <CustomSelect type='STATUS' placeholder={log['status']} elements={[
                            "pending", "validated", "ignored"
                          ]}/>
                      </SheetHeader>
                      <div className="container mx-auto p-6 max-w-4xl">
                        <div className="grid grid-cols-4 md:grid-cols-2 gap-6 mb-6">
                          <Card className="shadow-none">
                            <CardHeader className='border-b'>
                              <CardTitle className="text-lg">Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-700">{log.description}</p>
                            </CardContent>
                          </Card>
                          <Card className="shadow-none">
                            <CardHeader className='border-b'>
                              <CardTitle className="text-lg">Recommendation</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {/* The recommendation text is truncated in the image, so I'll use a placeholder/shortened version */}
                              <p className="text-sm text-gray-700">
                                AI detected high CPU usage by powershell.exe launched by user ADMIN-PC\manuela, combined
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Detection Context Section */}
                        <Card className="mb-6 shadow-none p-0 border-none">
                          <CardHeader className="px-0">
                            <CardTitle className="text-lg">Detection context</CardTitle>
                          </CardHeader>
                          <CardContent className="px-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="border">type</TableHead>
                                  <TableHead className="border">score</TableHead>
                                  <TableHead className="border">source_engines</TableHead>
                                  <TableHead className="border">rule_id</TableHead>
                                  <TableHead className="border">cluster_id</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium border">{log.type}</TableCell>
                                  <TableCell className="border">{log.score}</TableCell>
                                  <TableCell className="border">
                                    <div className="flex flex-wrap gap-1">
                                      {log.source_engines.map((engine, index) => (
                                        <Badge key={index} variant="secondary" className="px-2 py-1 bg-blue-100 text-blue-800 rounded-sm">
                                          {engine}
                                        </Badge>
                                      ))}
                                    </div>
                                  </TableCell>
                                  <TableCell className="border">{log.rule_id}</TableCell>
                                  <TableCell className="border">{log.cluster_id}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        {/* Host & User Info Section */}
                        <Card className="mb-6 shadow-none p-0 border-none">
                          <CardHeader className="px-0">
                            <CardTitle className="text-lg">Host & User Info</CardTitle>
                          </CardHeader>
                          <CardContent className="px-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="border">hostname</TableHead>
                                  <TableHead className="border">host_ip</TableHead>
                                  <TableHead className="border">user</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium border">{log.hostname}</TableCell>
                                  <TableCell className="border">{log.host_ip}</TableCell>
                                  <TableCell className="border">{log.user}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        {/* MITRE Enrichment Section */}
                        <Card className="mb-6 shadow-none p-0 border-none">
                          <CardHeader className="px-0">
                            <CardTitle className="text-lg">MITRE Enrichment</CardTitle>
                          </CardHeader>
                          <CardContent className="px-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="border">technique_id</TableHead>
                                  <TableHead className="border">technique_name</TableHead>
                                  <TableHead className="border">tactics</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium border">{log.technique_id}</TableCell>
                                  <TableCell className="border">{log.technique_name}</TableCell>
                                  <TableCell className="border">
                                    <div className="flex flex-wrap gap-1">
                                      {log.tactics.map((tactic, index) => (
                                        <Badge key={index} variant="outline" className="px-2 py-1 rounded-sm">
                                          {tactic}
                                        </Badge>
                                      ))}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        {/* Linked Alerts Section */}
                        <Card className="mb-6 shadow-none p-0 border-none">
                          <CardHeader className="px-0">
                            <CardTitle className="text-lg">Linked Alerts</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {Array(5).fill(null).map((_, index) => (
                                <li key={index} className="flex items-center space-x-2 text-blue-600 hover:underline cursor-pointer">
                                  {/* A simple circle icon or similar could go here if desired */}
                                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                  <span>TRACOID_14HU</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </SheetContent>
              </Sheet>
            ))}
        </TableBody>
      </Table>
    ) 
  }