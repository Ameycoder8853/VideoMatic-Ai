import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useContext } from 'react';
import { UserDetailContext } from '../../_context/UserDetailContext';
import Link from 'next/link';
import SideNav from './SideNav';

const Header = () => {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md p-5 px-8 flex items-center justify-between h-20">
      {/* Left Section: Logo and Heading */}
      <div className="flex items-center gap-6">
        <Link href="/" aria-label="Home"> {/* Clickable Logo */}
          <Image src={"/logo.jpeg"} width={40} height={40} alt="Logo" />
        </Link>
        <Link href="/" aria-label="Home"> {/* Clickable Heading */}
          <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-100 cursor-pointer">
            Videomatic AI
          </h2>
        </Link>
        <div className="flex gap-2">
          <Image src={'/rupee.png'} width={20} height={20}/>
          <h2 className="text-gray-900 dark:text-gray-100">credits:{userDetail?.credits}</h2>
        </div>
      </div>

      {/* Right Section: SideNav */}
        <SideNav />
    </div>
  );
};

export default Header;
