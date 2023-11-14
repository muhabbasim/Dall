'use client'
import React, { useEffect, useState } from 'react'
import MobileSidebar from '../MobileSidebar'
import NavbarRoutes from '../NavbarRoutes'
import './style.css';


export default function Navbar() {


  const [visible, setVisible] = useState(false);
  const changeVisibility = () => {
    if (window.scrollY >= 90) {
      setVisible(true)
    } else {
      setVisible(false);
    }
  }
  
  useEffect(() => {
    window.addEventListener('scroll', changeVisibility)
  })

  return (
    <div className={` flex w-full fixed items-center md:px-48 px-10 z-50  ${visible && 'navbar'}`}>
      <MobileSidebar />
      <NavbarRoutes /> 
    </div>
  )
}
