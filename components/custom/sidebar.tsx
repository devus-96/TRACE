// components/dashboard/Sidebar.tsx
import * as React from "react";
import Link from "next/link"; // If using Next.js
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Users } from 'lucide-react';
import { Cable } from 'lucide-react';
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Sidebar() {
  const pathname = usePathname()
  return (
    <div className="w-[75px] fixed top-0 bottom-0 bg-gray-800 text-white flex flex-col items-center py-6 space-y-6">
      {/* Logo Placeholder */}
      <Image src="/logo_trace.svg" alt="logo" width='40' height='40' />

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center space-y-6 mt-8">
        <Link href="/" className={clsx('p-2 rounded-lg text-gray-400 hover:bg-gray-700', {
          "bg-blue-600 text-white" : pathname === '/'
        })}>
          {/* Dashboard Icon - Placeholder, use actual SVG or LucideReact icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 001 1h3m-6-6v6m-3 0h6"
            />
          </svg>
        </Link>
        <Link href="/logs" className={clsx('p-2 rounded-lg text-gray-400 hover:bg-gray-700', {
          "bg-blue-600 text-white" : pathname === '/logs'
        })}>
          {/* Filters Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 0111 17v-5.586L4.293 6.707A1 1 0 014 6V4z"
            />
          </svg>
        </Link>
        <Link href="/security" className={clsx('p-2 rounded-lg text-gray-400 hover:bg-gray-700', {
          "bg-blue-600 text-white" : pathname === '/security'
        })}>
          {/* Reports Icon */}
          <ShieldCheck />
        </Link>
        <Link href="/teams" className={clsx('p-2 rounded-lg text-gray-400 hover:bg-gray-700', {
          "bg-blue-600 text-white" : pathname === '/teams'
        })}>
          {/* Users Icon */}
          <Users />
        </Link>
        <Link href="/setting" className={clsx('p-2 rounded-lg text-gray-400 hover:bg-gray-700', {
          "bg-blue-600 text-white" : pathname === '/setting'
        })}>
          {/* Settings Icon */}
          <Cable />
        </Link>
      </nav>
    </div>
  );
}