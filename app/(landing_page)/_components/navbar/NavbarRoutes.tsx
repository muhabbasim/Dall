"use client"

import { Button } from "../../../../components/ui/button";
import { Link as ScrollLink } from 'react-scroll/modules';

import './style.css'
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


type userProps = {
  first_name: string,
  email: string,
  last_name: string,
}

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

  const { logout, currentUser } = useContext(AuthContext)
  const router = useRouter()
  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      console.log(error)
    } finally {
      router.refresh();
    }
  }

  const [ user, setUser ] = useState<userProps>()
  useEffect(() => {
    setUser(currentUser?.user)
    
  },[currentUser])

  return (
    <>
      <div className={` w-full flex flex-row items-center justify-between gap-x-4 ml-auto pt-12`}>

        <div className=" rounded-[50%] ">
          <img className="md:w-20 w-14 md:h-20 h-14 object-cover cursor-pointer" src="./assets/logo.png" alt="logo image" />
        </div>

        <div className="hidden flex-row gap-6 md:flex ">
          {navbarItems.map((item, i) => (
            <ScrollLink 
              to={item.id} 
              smooth={true} 
              offset={0} 
              duration={2000} 
              className="px-3 py-1 rounded-lg text-white  hover:bg-opacity-70 hover:text-gray-500 cursor-pointer" key={i}
            >
              {item.name}  
            </ScrollLink>
          ))}
        </div>
       
        {user ? (
          <div className="hidden md:flex gap-6 items-center justify-center">
            <Link href={'/individual/dashboard'} className=" text-white hover:text-slate-400">{user.first_name}</Link>
            <Button 
            variant={'outline'}
              onClick={handleLogout}
              className="w-20" 
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex gap-6">
            <Link href={'/register'}>
              <Button className="w-32" variant={"secondary"}>
                Register
              </Button>
            </Link>
            <Link href={'/login'}>
              <Button className="w-32">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
} 

