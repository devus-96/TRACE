"use client";

import React from "react";
import { Sidebar } from "@/components/custom/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
        <Sidebar />
        <div className="w-[calc(100%-75px)] absolute right-0">
            {children}
        </div>
    </div>
  );
}