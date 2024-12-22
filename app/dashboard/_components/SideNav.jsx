"use client";
import {
  CircleUser,
  FileVideo,
  PanelsTopLeft,
  ShieldPlus,
  Home,
  Menu,
  Sun,
  Moon,
  Mail, // Mail icon for "Contact Us"
  FileText, // FileText icon for "Terms and Conditions"
  Shield, // Shield icon for "Privacy Policy"
  RefreshCw, // RefreshCw icon for "Refund Policy"
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const MenuOption = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      id: 2,
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: 3,
      name: "Create New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
    {
      id: 4,
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: ShieldPlus,
    },
    {
      id: 5,
      name: "Account",
      path: "/dashboard/account",
      icon: CircleUser,
    },
    {
      id: 6,
      name: "Privacy Policy",
      path: "/privacy-policy",
      icon: Shield, // Changed icon for Privacy Policy
    },
    {
      id: 7,
      name: "Terms and Conditions",
      path: "/terms-and-conditions",
      icon: FileText, // Changed icon for Terms and Conditions
    },
    {
      id: 8,
      name: "Refund Policy",
      path: "/refund-policy",
      icon: RefreshCw, // Changed icon for Refund Policy
    },
    // New "Contact Us" option
    {
      id: 9,
      name: "Contact Us",
      path: "/contact-us",
      icon: Mail, // Mail icon for Contact Us
    },
  ];

  const path = usePathname();

  return (
    <>
      {/* Menu Icon Button */}
      <button
        className="absolute top-3 right-4 z-50 text-gray-700 p-3 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-gray-300"
        onClick={() => setIsOpen(true)}
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-white font-bold text-lg"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* Menu Options */}
        <div className="mt-16 p-5">
          {MenuOption.map((item) => (
            <Link href={item.path} key={item.id}>
              <div
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-blue-700 hover:text-white ${
                  path === item.path ? "bg-blue-700 text-white" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <h2 className="font-medium">{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-4 left-0 w-full flex justify-between items-center px-5">
          {/* Theme Toggle Button */}
          <button
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500"
            onClick={toggleTheme}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* Clerk UserButton */}
          <div className="flex items-center">
            <UserButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
