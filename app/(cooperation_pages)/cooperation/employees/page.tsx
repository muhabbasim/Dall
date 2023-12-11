'use client'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';



export default function page() {

  
  const router = useRouter();

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: .3,
        delay: .1
      }} 
      className='w-full h-full flex gap-8 justify-between'
    >
      <div className='w-full space-y-6'>


        <div className='min-h-[400px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'> Our employees</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>
         

          <div className='p-20'>

          </div>
        </div>  
      </div>
    </motion.div>
  )
}