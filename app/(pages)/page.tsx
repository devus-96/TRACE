// components/dashboard/DashboardPage.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

// Importe les sous-composants
import { CPUUsageChart } from "@/components/custom/CPUUsageChart"; 
import { MemoryAllocationChart } from "@/components/custom/MemoryAllocationChart"; 
import { DiskUsageChart } from "@/components/custom/DiskUsageChart";

export default function DashboardPage() {
  const [cpuData, setCpuData] = useState([]);
  // Données factices pour les tables
  const securitySignals = [
    { severity: "CRITICAL", host: "DESKTOP-SEC1", issue: "Command and Scripting Interpreter detected", source: ["ai_engine", "static_rule_engine"] },
    { severity: "CRITICAL", host: "DESKTOP-SEC1", issue: "Lateral movement detected", source: ["ai_engine"] },
    { severity: "CRITICAL", host: "DESKTOP-SEC1", issue: "DDOS attem", source: ["ai_engine"] }, // Truncated as in image
    { severity: "MEDIUM", host: "SERVER-PROD2", issue: "Unauthorized access attempt", source: ["audit_engine"] },
    { severity: "LOW", host: "LAPTOP-DEV", issue: "Suspicious login from new IP", source: ["auth_engine"] },
  ];

  const topSources = [
    { ip: "192.168.1.42" },
    { ip: "10.0.5.23" },
    { ip: "172.16.12.77" },
    { ip: "192.168.1.100" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/events');
        const data = await response.json();
        setCpuData(data);
      } catch (error) {
        console.error('Error fetching CPU data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000); // Rafraîchir toutes les 30 secondes

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </div>

        {/* Top Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CPUUsageChart cpuData={cpuData} />   
          <MemoryAllocationChart memoryData={cpuData} />
        </div>

        {/* Middle Section: Disk, Security Signals, Posture Score, Top Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Disk Usage */}
          <Card className="col-span-1">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Disk</CardTitle>
            </CardHeader>
            <CardContent>
              <DiskUsageChart />
              <div className="mt-4 text-sm space-y-1">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <span>Used Disk <span className="font-semibold">80%</span></span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span>Free Disk <span className="font-semibold">20%</span></span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Signals */}
          <Card className="col-span-2 md:col-span-3 lg:col-span-3 lg:row-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Security signals</CardTitle>
                <div className="flex space-x-2 text-sm">
                  <Badge variant="destructive" className="bg-red-500 text-white">40 CRITICAL</Badge>
                  <Badge variant="secondary" className="bg-orange-300 text-orange-800">45 MEDIUM</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full overflow-auto"> {/* Added scroll for many signals */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] border">Severity</TableHead>
                    <TableHead className="border">Host</TableHead>
                    <TableHead className="border">Issue</TableHead>
                    <TableHead className="border">Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securitySignals.map((signal, index) => (
                    <TableRow key={index}>
                      <TableCell className="border">
                        <Badge variant={signal.severity === "CRITICAL" ? "destructive" : signal.severity === "MEDIUM" ? "secondary" : "outline"}
                               className={signal.severity === "CRITICAL" ? "bg-red-500 text-white" : signal.severity === "MEDIUM" ? "bg-orange-300 text-orange-800" : ""}>
                          {signal.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="border">{signal.host}</TableCell>
                      <TableCell className="border">{signal.issue}</TableCell>
                      <TableCell className="border">
                        <div className="flex flex-wrap gap-1">
                          {signal.source.map((src, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800 rounded-sm">
                              {src}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Posture Score */}
          <Card className="col-span-1 border-2 border-blue-500"> {/* Added blue border */}
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Posture Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[calc(100%-60px)]"> {/* Adjust height to fit content */}
              <div className="text-5xl font-bold text-gray-800 mb-2">55%</div>
              <div className="flex items-center text-red-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span>1.5%</span>
              </div>
              {/* This is a simplified progress bar, Shadcn's Progress component could be used for a true bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Top Sources */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Top sources</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] overflow-auto"> {/* Added scroll for many sources */}
              <Table>
                <TableBody>
                  {topSources.map((source, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">IP</TableCell>
                      <TableCell>{source.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Collectors Status Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Collectors status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-green-600 font-semibold">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>Conected</span> {/* Typo as in image */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}