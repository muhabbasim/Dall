'use client'
import React from 'react'
import { AlertTriangle, Expand, GraduationCap, ShieldAlert, TvIcon } from 'lucide-react';
import { motion } from 'framer-motion'

export default function IndividualStates() {
  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: .5,
        delay: .5
      }} 
      className='h-[100px] flex gap-5 justify-between'
    >
      <div
          
        className='indivisual_status cursor-pointer text-white bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shasdow shadow-lg'
      >

        <div>
          <h1 className='text-sm'>
            Exams
          </h1>
          <h1 className='text-2xl font-bold'>
            1
          </h1>
          <p className='text-sm text-gray-400'>
            total number
          </p>
        </div>
        <div className='h-full pt-4'>
          <TvIcon className='h-6 w-6'/>
        </div>
        
      </div>
      <div
      
        className='indivisual_status cursor-pointer text-white bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shadow-lg'
      >
          <div>
          <h1 className='text-sm'>
            Consultation
          </h1>
          <h1 className='text-2xl font-bold'>
            2
          </h1>
          <p className='text-sm text-gray-400'>
            total number
          </p>
        </div>
        <div className='h-full pt-4'>
          <Expand className='h-6 w-6'/>
        </div>
      
      </div>
      <div 
        
        className='indivisual_status cursor-pointer text-white bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shadow-lg'
      >
        <div>
          <h1 className='text-sm'>
            Result
          </h1>
          <h1 className='text-2xl font-bold'>
            73%
          </h1>
          <p className='text-sm text-gray-400'>
            total results
          </p>
        </div>
        <div className='h-full pt-4'>
          <GraduationCap className='h-6 w-6'/>
        </div>
      </div>
    </motion.div>
  )
}
