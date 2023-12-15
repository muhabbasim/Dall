"use client"

import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'






export default function layout({ children } : {
  children: ReactNode
}) {

  return (
    <div className='h-full flex'>
      <div className='h-[70px] md:pl-72 fixed inset-y-0 w-full z-50'>
        {/* <Navbar/> */}
      </div>
      <div className='hidden fixed md:flex h-full flex-col inset-y-0 z-50'>
        {/* <Sidebar/> */}
      </div>
      <main className='h-full pt-[70px] md:pl-[18rem] w-full '>
        {children}
      </main>
    </div>
  )
}



