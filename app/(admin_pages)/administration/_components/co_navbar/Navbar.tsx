import React from 'react'
import MobileSidebar from '../co_mobileSidebar/MobileSidebar'
import NavbarRoutes from '../co_navbarRoutes/NavbarRoutes'

export default function Navbar() {
  return (
    <div className='px-8 h-full w-full border-b flex items-center justify-between bg-white shadow-sm'>
      <MobileSidebar/>
      <NavbarRoutes/>
    </div>  
  )
}
