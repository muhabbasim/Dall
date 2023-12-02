import React from 'react'
import './sidebar.css'
import { FileEdit, LayoutDashboard, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SidebarItem from '../sidebarItem/SidebarItem';
import { Separator } from '../../ui/separator';
import Link from 'next/link';

const indivisualRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/indivisual/dashboard"
  },
  {
    icon: FileEdit,
    label: "profile",
    href: "/indivisual/profile"
  },
  {
    icon: MessageSquare,
    label: "consultation",
    href: "/indivisual/consultation"
  },
];

const CooperationRoutes = [
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

  const pathName = usePathname();

  const isIndivisualUser = pathName?.includes('indivisual')
  const isCoorporateUser = pathName?.startsWith('coorporate')
  const isAdminUser = pathName?.startsWith('admin')

  let routes;

  if(isIndivisualUser) {
    routes = indivisualRoutes;
  } else if (isCoorporateUser) {
    routes = CooperationRoutes;
  } else if (isAdminUser) {
    routes = AdminRoutes;
  } else {
    routes = [];
  }

  // grayscale hover:grayscale-0  
  return (
    <div className='h-full w-[300px] border-r overflow-y-auto bg-white shadow-lg'>
      <div className='sidebar_header_container text-sky-700 p-6 flex items-center justify-center gap-5 cursor-pointer'>
        <div className='w-10 h-10'>
          <img
            alt="indivisual dash image"
            src="/assets/logo.png" 
            className="object-cover w-full"
            />
        </div>
        <Link href={'/'} className='sidebar_title text-3xl text-gray-500 font-[700] transition-all'>Dall_In</Link>
      </div>

      
      <div className='flex flex-col  space-y-10'>
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
          { routes.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          ))}
        </div>
        <div>

        </div>
      </div>

    </div>
  )
}
