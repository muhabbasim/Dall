'use client'
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'



export default function layout({ children } : 
  {children: React.ReactNode
}) {

  // const router = useRouter();
  // const { currentUser } = useContext(AuthContext);

  // if ( currentUser ) {
  //   router.push('/')
  //   return;
  // }

  return (
    <main className='auth_container flex justify-center'>
      <div className='max-w-[1200px] min-h-screen flex justify-center items-center'>
        <div className='w-full p-5'>{ children }</div>
      </div>
    </main>
  )
}
