import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./nav/TopBar";
import Sidebar from "./nav/Sidebar";
import "@/styles/Scrollbar.module.css";
// import { ThemeProvider } from './theme-context'; // Uncomment if using theme context

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-grow min-h-0">
        {/* Top bar at the top of main content */}
        <TopBar />

        {/* Page content */}
        <div className="flex-grow p-4 overflow-auto scrollbar-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
