"use client"

import { Button } from "../ui/button";
import { Link, animateScroll as scroll, scrollSpy } from 'react-scroll/modules';


import './style.css'
// import Link from "next/link";

export default function NavbarRoutes() {

  const navbarItems = [
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


  return (
    <>
      <div className={` w-full flex flex-row items-center justify-between gap-x-4 ml-auto pt-12`}>

        <div className=" rounded-[50%] ">
          <img className="md:w-20 w-14 md:h-20 h-14 object-cover cursor-pointer" src="./assets/logo.png" alt="logo image" />
        </div>

        <div className="hidden flex-row gap-6 md:flex ">
          {navbarItems.map((item, i) => (
            <Link 
              to={item.id} 
              smooth={true} 
              offset={0} 
              duration={2000} 
              className="text-lg px-3 py-1 rounded-lg text-white  hover:bg-opacity-70 hover:text-gray-500 cursor-pointer" key={i}
            >
              {item.name}  
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex gap-6">
          <Button className="w-32" variant={"secondary"}>
            Register
          </Button>
          <Button className="w-32">
            Login
          </Button>
        </div>
      </div>
    </>
  )
}
