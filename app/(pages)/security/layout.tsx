"use client";

import React from "react";
import { NavigationMenuElt } from "@/components/security/navigationMenu";
import { ShieldCheck } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
          <div className="flex items-center border-b">
              <div className=" flex items-center space-x-2 py-2 px-4 md:px-8">
                  <ShieldCheck />
                  <p className="font-semibold text-lg">Security</p>
              </div>
              <NavigationMenuElt />
          </div>
            {children}
    </div>
  );
}