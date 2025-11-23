"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ThemeToggle = () => {

    const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="focus:rotate-90 transition-transform ease-in-out duration-300 cursor-pointer">
          <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("pink")} className="font-semibold cursor-pointer">
          Pink
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("vintage")} className="font-semibold cursor-pointer">
          Vintage
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
