"use client"
import Navbar from '@/components/dash_components/navbar/Navbar'
import Sidebar from '@/components/dash_components/sidebar/Sidebar'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'





export default function layout({ children } : {
  children: ReactNode
}) {
  // const router = useRouter()
  //   // const expirationTime = userData.expires_in
  // const Data = localStorage.getItem('currentUser');
  // const userData = JSON.parse(Data!)
  // const token = userData?.access_token
  // const expirationTime = userData.expires_in; // Assuming expires_in is in milliseconds
  // const expirationDate = new Date(new Date().getTime() + expirationTime);
  // console.log(expirationDate)
  
  // if (expirationDate <= new Date().getTime()) {
  //   // Token has expired, remove it
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('tokenExpiration');
  // }

  // setTimeout(() => {
  //   // localStorage.removeItem('access_token');
  //   // localStorage.removeItem('currentUser');
  // }, expirationTime);

  // if (!userData) {
  //   router.push('/')
  // }
  
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



