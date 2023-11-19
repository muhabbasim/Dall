'use client'

import React, { useEffect, useState } from 'react'
import './bottomBar.css'
import Image from 'next/image';

export default function BottomBar() {

  const barData = [
    // {
    //   name: 'Home',
    //   url: 'http://localhost'
    // },
    {
      name: 'Management',
      url: 'http://localhost'
    },
    {
      name: 'Services',
      url: 'http://localhost'
    },
    {
      name: 'Projects',
      url: 'http://localhost'
    },
    {
      name: 'Our Vision',
      url: 'http://localhost'
    },
    {
      name: 'Contact Us',
      url: 'http://localhost'
    },
  ]

  const [ isActive, setIsActive ] = useState(false);
  const windowScroll = () => {
    window.scrollY > 300 ? setIsActive(true) : setIsActive(false)
    // window.scrollY > 2500 && setIsActive(false)
  }

  useEffect(()=> {
    window.addEventListener('scroll', windowScroll)
    return () => { // clean up
      window.addEventListener('scroll', windowScroll)
    }
  })


  return (
    <>
      { <div className={`hidden md:flex mt-[-100px] ${isActive && 'active'} barContainer w-5/12 fixed top-5 left-0 right-0 m-auto h-12 px-5 flex justify-around items-center backdrop-blur-sm rounded-[50px] shadow-sm shadow-gray-700`}>
        <div className=' w-full flex justify-around items-center'>
          <div className=''>
            <Image 
              src="/assets/logo.png" 
              alt="logo bar image" 
              width={0}
              height={0}
              className='h-10 w-10 cursor-pointer grayscale hover:grayscale-0 transition-all' 
            />
          </div>
          {barData.map((barItem, i) => (
            <div className='barItem cursor-pointer'
              key={i}
            >
              <span>{barItem.name}</span>
            </div>
          ))}
        </div>    
      </div> }
    </>

  )
}
