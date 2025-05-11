import NavBar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <div className='flex'>
        <NavBar/>
        <div className=' '>
            <Outlet/>
        </div>

    </div>
  )
}

export default Layout