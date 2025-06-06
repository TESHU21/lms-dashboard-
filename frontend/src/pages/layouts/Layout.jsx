import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './nav/TopBar';
import Sidebar from './nav/Sidebar';
// import { ThemeProvider } from './theme-context'; // Uncomment if using theme context

const Layout = () => {
  return (
    <div className="flex min-h-screen">
    
      
      {/* Sidebar on the left */}
      <div className='hidden lg:flex'>
      <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Top bar at the top of main content */}
        <TopBar />

        {/* Page content */}
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
