"use client";

import React from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navItems: string[] = ["Home", "About Us", "Contact Us"];

  return (
    <div className="navbar flex justify-between items-center p-4 px-10 shadow-md bg-card">
      <div className="navLogo">
        <h3 className="font-berk-shwash text-foreground text-xl">
          Pretty Polaroid
        </h3>
      </div>
      <nav className="flex justify-around gap-4">
        <ul className="flex justify-around items-center gap-12">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase}`}
                className="text-foreground font-berk-shwash"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button> */}
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
