// component/NavLinkItem.js (Simplified for testing)
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assuming you have this

const NavLinkItem = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === `/app/${item.path}` || (item.path === "" && location.pathname === "/app");

  return (
    <NavLink
      to={`/app${item.path ? `/${item.path}` : ''}`}
      className={({ isActive: linkIsActive }) =>
        cn(
          "flex items-center gap-2 w-[264px] h-[40px] mx-2 rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-background text-sidebar-accent",
          item.icon && "pl-2"
        )
      }
    >
      {item.icon && <item.icon className="h-4 w-4" />}
      {item.name}
    </NavLink>
  );
};

export default NavLinkItem;