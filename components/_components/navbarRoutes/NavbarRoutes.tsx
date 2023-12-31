import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import './navbarRoutes.css'
import { Separator } from '../../ui/separator';
import { cn } from '@/lib/utils';
import { AuthContext } from '@/context/authContext';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  MessageSquare,
  User,
  LogOut, 
  Settings
} from "lucide-react"
import { useUserData } from '@/components/data/dataFether';
import CorporateNavImage from '@/app/(cooperation_pages)/cooperation/dashboard/_components/navbar_image/CorporateNavImage';
import IndividualNavImage from '@/app/(indivisual_pages)/individual/dashboard/_components/navbar_image/IndividualNavImage';

const DashNavItems = [
  {
    name: 'Home',
    id:"home"
  },
  {
    name: 'Blog',
    id:"projects"
  },
  {
    name: 'Projects',
    id:"FAQ"
  },
]


export default function NavbarRoutes() {
  const { currentUser } = useContext(AuthContext);

  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/')
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex w-full justify-between items-center'>
      <div className="hidden md:flex items-center w-full flex-row gap-10 ml-20">
        {DashNavItems.map((item, i) => (
          <Link 
            key={i}
            href={''}
            className={cn(`Dash_nav_link_title cursor-pointer text-sm text-slate-700  hover:text-sky-600 transition-all `)}
          >
            {item.name}  
          </Link>
        ))}
      </div>
     

      <div className='flex w-full items-center md:justify-end justify-end gap-5'>
        <div className=' px-5'>
          <Separator orientation='horizontal' color='black' className=' h-[50px] w-[1px] opacity-100'/>
        </div>
       
        <div className='nav_Icon_bg rounded-full w-10 h-10 flex items-center text-white justify-center cursor-pointer hover:opacity-50 transition-all'>
          <Link href={'/individual/profile'}>
            <Settings />
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              {currentUser?.role === 'company' ? (
                <CorporateNavImage/>
                ) : (
                <IndividualNavImage/>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel> Welcome To Dall</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href={''}><span>Profile</span></Link>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Message</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <button onClick={handleLogout}>Log out</button>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
