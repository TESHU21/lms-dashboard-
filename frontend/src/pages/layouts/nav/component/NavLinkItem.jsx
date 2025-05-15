import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ item }) => (
  <NavLink
    to={item.path}
    className={({ isActive }) =>
      `w-[264px] h-[40px] py-4 px-2 mx-2 rounded-sm flex items-center justify-start gap-2 transition-colors
      ${
        isActive
          ? 'bg-background text-sidebar-accent   '
          : ''
      }`
    }
  >
    <span className="text-lg">{item.icon && <item.icon />}</span>
    <span>{item.name}</span>
  </NavLink>
);

export default NavLinkItem;
