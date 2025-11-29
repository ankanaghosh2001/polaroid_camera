"use client";

import React from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  // const navItems: string[] = ["Home", "Contact Us"];

  return (
    <div className="navbar flex justify-between items-center p-4 px-10 shadow-md bg-card">
      <div className="navLogo">
        <h3 className="font-berk-shwash text-foreground text-sm lg:text-xl">
          Pretty Polaroid
        </h3>
      </div>
      <nav className="flex justify-around gap-4">
        <ul className="flex justify-around items-center gap-12 text-sm lg:text-lg">
          {/* {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase}`}
                className="text-foreground font-berk-shwash"
              >
                {item}
              </Link>
            </li>
          ))} */}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
