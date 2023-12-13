'use client'

import { Separator } from '@/components/ui/separator'
import React from 'react'
import { motion } from 'framer-motion'


export default function page() {
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
        <div className='min-h-[600px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Available services</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          <div className='p-20 h-full flex justify-around items-center'>

   
           
          </div>
        </div>  
      </div>
    </motion.div>
  )
}
