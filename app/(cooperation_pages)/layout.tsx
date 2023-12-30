"use client"
import Navbar from '@/components/_components/navbar/Navbar'
import Sidebar from '@/components/_components/sidebar/Sidebar'
import { AuthContext } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useContext } from 'react'





export default function Layout({ children } : {
  children: ReactNode
}) {
  
    
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  if ( currentUser && currentUser?.role !== 'company' ) {
    router.push('/authorization_error')
    return;
  }
  
  return (
    <div className='h-full flex'>
      <div className='h-[70px] md:pl-72 fixed inset-y-0 w-full z-50'>
        <Navbar/>
      </div>
      <div className='hidden fixed md:flex h-full flex-col inset-y-0 z-50'>
        <Sidebar/>
      </div>
      <main className='h-full pt-[70px] md:pl-[18rem] w-full '>
        {children}
      </main>
    </div>
  )
}



