import React from 'react';
import AzubiLogo2 from "../../../assets/Azubi-Logo2.svg";
import { navLinks, bottomLinks } from "./component/data";
import NavLinkItem from './component/NavLinkItem';

const Sidebar = () => {
  return (
    <div className="w-[280px] h-screen bg-sidebar text-sidebar-foreground dark:bg-sidebar flex flex-col">

      {/* Logo section */}
      <div className='flex justify-center gap-1 items-center w-[264px] h-[93px] bg-accent mt-[14px] ml-2 rounded-sm'>
        <img src={AzubiLogo2} alt="Logo of letter Cj with blue color" className='w-[30px] h-[28px]' />
        <span className='leading-[30px] text-[24px] font-bold font-lusitana text-blue-primary dark:text-white'>
          CLient
        </span>
      </div>

      {/* Navigation area: Top + Spacer + Bottom */}
      <div className='flex flex-col flex-1 dark:bg-sidebar-accent'>
        {/* Top nav links */}
        <div className="flex flex-col mt-[37px] gap-4">
          {navLinks.map((link) => (
            <NavLinkItem key={link.id} item={link} />
          ))}
        </div>

        {/* Spacer to push bottom links down */}
        <div className="flex-grow" />

        {/* Bottom nav links */}
        <div className="flex flex-col gap-4 mb-[69px]">
          {bottomLinks.map((link) => (
            <NavLinkItem key={link.id} item={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
