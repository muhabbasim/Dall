'use client'
import './indivisualDashboard.css';
import React from 'react'
import PersonalCard from '../../_components/peronal_card/PersonalCard'
import { Separator } from '@/components/ui/separator'
import DataTable from '../consultation/consultation_data_table/DataTable'
import { Expand, GraduationCap, TvIcon } from 'lucide-react';
import DashDataTable from './dashbord_data_table/DashDataTable';
import { columns } from './dashbord_data_table/DashColumns';
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type Payment = {
  id: string
  amount: number
  status: Boolean
  email: string
}

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: true,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: false,
    email: "Abe45@gmail.com",
  },

]

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

        <div className='min-h-[400px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Pervious Exams</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          <div className='p-20'>
            <DashDataTable columns={columns} data={data}/>
          </div>

        </div>  
      </div>
    </motion.div>
  )
}