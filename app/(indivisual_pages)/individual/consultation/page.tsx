'use client'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import DataTable from './consultation_data_table/DataTable'
import { columns } from './consultation_data_table/Columns'
import {motion} from 'framer-motion'

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
      className='w-full flex gap-8 justify-between'
    >
      <div className='w-full'>

        <div className='min-h-[600px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Pervious Consultation</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          <div className='p-20'>
            <DataTable columns={columns} data={data}/>
          </div>

        </div>  
      </div>
    </motion.div>
  )
}
