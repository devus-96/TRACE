"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle, // Still useful for basic styling
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"

export function NavigationMenuElt() {
  const pathname = usePathname()
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-4"> {/* Added flex and space-x for horizontal layout */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`${navigationMenuTriggerStyle()} relative`} // Added relative for underline positioning
          >
            <Link href="/security">
              Inbox
              {/* Active state indicator */}
              {pathname === '/security' && <span className="absolute bottom-0 left-0 w-full h-[5px] rounded-tl-2xl rounded-tr-2xl bg-blue-500"></span>}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/security/zero-day">
              Zero Day
              {pathname === '/security/zero-day' && <span className="absolute bottom-0 left-0 w-full h-[5px] rounded-tl-2xl rounded-tr-2xl bg-blue-500"></span>}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}