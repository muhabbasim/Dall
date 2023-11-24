'use client'

import React, { useEffect, useState } from 'react'
import './bottomBar.css'
import { Link, animateScroll as scroll, scrollSpy } from 'react-scroll/modules';

export default function BottomBar() {

  const barData = [
    // {
    //   name: 'Home',
    //   id:"home"
    // },
    {
      name: ' Visions',
      id:"vision"
    },
    {
      name: 'Services',
      id:"services"
    },
    {
      name: 'Projects',
      id:"projects"
    },
    {
      name: 'FQA',
      id:"FAQ"
    },
    {
      name: 'Testimonials',
      id:"Testimonials"
    },
    {
      name: 'Contact us',
      id:"contact"
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
      { <div className={`hidden md:flex mt-[-100px] ${isActive && 'active_bar'} barContainer w-5/12 fixed top-5 left-0 right-0 m-auto h-12 px-5 flex justify-around items-center backdrop-blur-sm rounded-[50px] shadow-sm shadow-gray-700 z-50`}>
        <div className=' w-full flex justify-around items-center'>
          <Link to='home' smooth={true} className=''>
            <img 
              src="/assets/logo.png" 
              alt="logo bar image" 
              className='h-10 w-10 cursor-pointer grayscale hover:grayscale-0 transition-all' 
            />
          </Link>
          {barData.map((barItem, i) => (
            <Link className='barItem cursor-pointer'
              to={barItem.id}
              smooth={true}
              spy={true}
              key={i}
              offset={0} 
              duration={2000} 
              activeClass="active_link" 
            >
              <span>{barItem.name}</span>
            </Link>
          ))}
        </div>    
      </div> }
    </>

  )
}
