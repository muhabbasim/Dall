import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import './navbarRoutes.css'
import { Separator } from '../../../../../components/ui/separator';
import { cn } from '@/lib/utils';
import { AuthContext } from '@/context/authContext';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  User,
  UserPlus,
  Users,
  BellRing,
  LogOut, 
  MessageCircle,
  Settings
} from "lucide-react"
import { useUserData } from '@/components/data/dataFether';

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
    name: 'Project',
    id:"FAQ"
  },
  {
    name: 'Trending',
    id:"Testimonials"
  },
  {
    name: 'Contact us',
    id:"contact"
  },

]


export default function NavbarRoutes() {
  
  const { data: useData } = useUserData()

  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex w-full justify-between items-center'>
      <div className="flex-row gap-10 flex ml-20">
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
     

      <div className='flex items-center justify-around gap-5'>
        <div className=' px-5'>
          <Separator orientation='horizontal' color='black' className=' h-[50px] w-[1px] opacity-100'/>
        </div>
       
        <div className='nav_Icon_bg rounded-full w-10 h-10 flex items-center text-white justify-center cursor-pointer hover:opacity-50 transition-all'>
          <Settings />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='sidebar_img_container w-10 h-10 rounded-full overflow-hidden'>
              <img 
                src="/assets/images/indivisual_img.avif" 
                alt="" 
                className='sidebar_img object-contain'
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel> Welcome {useData?.first_name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href={'/individual/profile'}><span>Profile</span></Link>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link href={''}><span>Settings</span></Link>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
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
