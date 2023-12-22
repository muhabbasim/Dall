'use client'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import api from '@/context/apiRequest'
import ServicesDataTable from './_components/services_data_table/ServicesDataTable'
import { columns } from './_components/services_data_table/ServicesColumns'

export default function CooperationServices() {
  
  const { data: perviousServices, isLoading, isError } = useQuery({
    queryKey: ['pervious_services'],
    queryFn: async () => 
    await api.get(`/company/list`).then((res) => {
      return res.data?.data;
    })
  })



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
        <div className='min-h-[700px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Subscribed services</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          <div className='p-6 md:p-20'>
            <ServicesDataTable isLoading={isLoading} isError={isError} columns={columns} data={perviousServices || []}/>
          </div>
        </div>  
      </div>
    </motion.div>
  )
}