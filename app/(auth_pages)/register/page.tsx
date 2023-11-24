"use client"
import React, { useState } from 'react'
import './register.css'
import { Building2, UserCircle2 } from 'lucide-react'
import IndivisualForm from './indivisuals_forms/IndivisualForm'
import CoorporateForm from './coorporate_form/CoorporateForm'
import { cn } from '@/lib/utils'
import Link from "next/link";



export default function Register() {

  const [toggle, setToggle] = useState(1)  

  return (
    <div className=' w-full h-full flex justify-center rounded-xl overflow-hidden opacity-95'>
     
      <div className='right w-full flex bg-white md:w-[60%]'>
        
        <div className='register_side_menu space-y-32 py-14 shadow shadow-black-400'>
          <div className=" flex justify-center items-center">
            <Link href={'/'}>
              <img 
                src="/assets/logo.png" 
                alt="logo bar image" 
                className='h-10 w-10 cursor-pointer opacity-70 hover:opacity-100 transition-all md:h-14 md:w-14' 
              />
            </Link>
          </div>
          <div className='flex flex-2 gap-10 flex-col cursor-pointer'>
            <div 
              onClick={() => setToggle(1)}
              className= {cn(`register_btn px-4 flex items-center flex-col justify-center gap-1 transition-all ${toggle === 1 && 'active_register_but '}`)}
            >
              <UserCircle2 size={20} className='text-gray-400'/>
              <button className='text-[12px] text-gray-400 hidden md:inline'>Indivisual</button>
            </div>
            <div 
              onClick={() => setToggle(2)}
              className= {cn(`register_btn px-4 flex items-center flex-col justify-center gap-1 transition-all ${toggle === 2 && 'active_register_but '}`)}
            >
              <Building2 size={20}  className='text-gray-400 '/>
              <button className=' text-[12px] text-gray-400 hidden md:inline'>Cooperation</button>
            </div>
          </div>
        </div>

        {toggle === 1 ? (
          
          <IndivisualForm/>
        ) : (
          <CoorporateForm/>
        )}
      </div>

      <div className='auth_img_container hidden relative left w-[40%] md:flex flex-col'>
      {toggle === 1 ? (
          
          <div className='flex  flex-col justify-center gap-10 pt-20 px-10'>
            <h1 className='text-3xl text-white font-bold'>Welcom to Dall <span className='text--500'>indivisual</span> </h1>
            <p className='text-white text-xl'>whe measurement of capabilities is the foundation of success!</p>
          </div>
        ) : (
          <div className='flex  flex-col justify-center gap-10 pt-20 px-10'>
            <h1 className='text-3xl text-white font-bold'>Welcom to Dall <span className='text--500'>Cooperation</span> </h1>
            <p className='text-white text-xl'>whe measurement of capabilities is the foundation of success!</p>
          </div>
        )}
        
      </div>
    </div>
  )
}
