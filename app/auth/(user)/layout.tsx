"use client";

import React from "react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full flex justify-center">
        <div className="h-screen flex justify-between relative">
            <div className="w-full lg:w-[350px] relative flex flex-col justify-center px-4 lg:px-0">
                {children}
            </div>
            <div className="hidden lg:w-[500px] lg:relative lg:flex lg:flex-col lg:justify-center">
                <Image className="absolute top-1/2 translate-y-[-50%] right-0" src='/authImg.png' alt="auth" width={450} height={450} />
            </div>
        </div>
    </div>
  );
}