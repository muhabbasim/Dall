import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import './style.css'

export default function layout({ children } : 
  {children: React.ReactNode
}) {
  return (
    <main className=''>
      <div className=''>
        <div className='inset-y-0 w-full z-50'>
          <Navbar /> 
        </div>
        <div className='w-full'>{ children }</div>
      </div>
    </main>
  )
}

// dir='rtl'