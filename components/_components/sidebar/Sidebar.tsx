import React, { useContext } from 'react'
import './sidebar.css'
import { BarChartHorizontalBig, Box, FileEdit, LayoutDashboard, LogOut, MessageSquare, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import SidebarItem from '../sidebarItem/SidebarItem';
import { Separator } from '../../ui/separator';
import Link from 'next/link';
import { AuthContext } from '@/context/authContext';

type RouterProps = {
  icon: any;
    label: string;
    href: string;
}

const indivisualRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/individual/dashboard"
  },
  {
    icon: FileEdit,
    label: "profile",
    href: "/individual/profile"
  },
  {
    icon: MessageSquare,
    label: "consultation",
    href: "/individual/consultation"
  },
];

const CooperationRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/cooperation/dashboard"
  },
  {
    icon: Box,
    label: "Services",
    href: "/cooperation/services"
  },
  {
    icon: FileEdit,
    label: "profile",
    href: "/cooperation/profile"
  },
  {
    icon: Users,
    label: "employees",
    href: "/cooperation/employees"
  },
]

const AdminRoutes = [
  {
    icon: "",
    label: "Courses",
    href: "/teacher/courses"
  },
  {
    icon: "",
    label: "Analytics",
    href: "/teacher/analytics"
  },
]



export default function Sidebar() {

  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const pathName = usePathname();

  const isIndivisualUser = pathName?.includes('individual')
  const isCooperationUser = pathName?.includes('cooperation')
  const isAdminUser = pathName?.startsWith('admin')

  let routes;

  if(isIndivisualUser) {
    routes = indivisualRoutes;
  } else if (isCooperationUser) {
    routes = CooperationRoutes;
  } else if (isAdminUser) {
    routes = AdminRoutes;
  } else {
    routes = [];
  }

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
    <div className='h-full w-[300px] border-r overflow-y-auto bg-white shadow-lg'>
      <div className='sidebar_header_container text-sky-700 p-6 flex items-center justify-center gap-1 cursor-pointer'>
        <div className='w-10 h-10'>
          <img
            alt="indivisual dash image"
            src="/assets/logo.png" 
            className="object-cover w-full"
            />
        </div>
        <Link href={'/'} className='sidebar_title text-3xl text-gray-500 font-[700] transition-all'>Dall_In</Link>
      </div>

      
      <div className='flex relative h-[95vh] flex-col  space-y-10'>
        <div className=' flex flex-col gap-5 items-center mt-10'>
          {/* <div className=' w-20 h-20 rounded-full overflow-hidden'>
            <img 
              src="/assets/images/indivisual_img.avif" 
              alt="" 
              className='sidebar_img object-cover'
            />
          </div> */}
          <div className='text-center'>
            <h2>Emanuell, <span className='font-bold'>Thani</span></h2>
            <h3 className='text-slate-400 text-sm'>Emanuellthani@dall.com</h3>
          </div>
        </div>
        <div className=' px-5'>
          <Separator orientation='horizontal' color='black' className=' opacity-50'/>
        </div>

        <div className='flex flex-col gap-2 justify-center px-5'>
          { routes.map((route: RouterProps) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          ))}
        </div>
        <div className=' absolute bottom-20 w-full px-10 '>
          <Separator orientation='horizontal' color='black' className=' opacity-50 mb-2'/>
          <div className='flex gap-2 p-4 items-center w-full cursor-pointer text-slate-500 hover:bg-slate-300/20 hover:text-sky-700 '>
            <LogOut className="mr-2 h-4 w-4 text-rose-900" />
            <button onClick={handleLogout}>Exit</button>
          </div>
        </div>
      </div>

    </div>
  )
}
