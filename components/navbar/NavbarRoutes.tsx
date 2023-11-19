"use client"

import { Button } from "../ui/button";
import Link from "next/link";
import './style.css'

export default function NavbarRoutes() {

  const navbarItems = [
    {name: 'Home'},
    {name: ' Visions'},
    {name: 'Services'},
    {name: 'Future Projects'},
    {name: 'Management'},
    {name: 'Contact us'},
  
  ]


  return (
    <>
      <div className={` w-full flex flex-row items-center justify-between gap-x-4 ml-auto pt-12`}>

        <div className=" rounded-[50%] ">
          <img className="md:w-20 w-14 md:h-20 h-14 object-cover cursor-pointer" src="./assets/logo.png" alt="logo image" />
        </div>

        <div className="hidden flex-row-reverse gap-6 md:flex ">
          {navbarItems.map((item, i) => (
            <Link href="/" className="text-lg px-3 py-1 rounded-lg text-white hover:bg-blue-100 hover:bg-opacity-70 hover:text-blue-800" key={i}>
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
