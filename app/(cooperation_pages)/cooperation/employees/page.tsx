'use client'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query';
import api from '@/context/apiRequest';
import CooperationEmployeeDataTable from './_components/cooperation_employee_data_table/CooperationEmployeeDataTable';
import { columns } from './_components/cooperation_employee_data_table/CooperationEmployeeDataColumns';



export default function CooperationEmployeesPage() {

  const { data: companyEmployees, isError, isLoading } = useQuery({
    queryKey: ['companyEmployees'],
    queryFn: async () => 
      await api.get(`/company/individuals`).then(res => {
        return res.data?.data;
      })
  }) 

  // console.log(companyEmployees)

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
            <h1 className=' font-bold text-slate-600'>Our employees</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          <div className='p-6 md:p-20'>
            <CooperationEmployeeDataTable columns={columns} data={companyEmployees || []} isError={isError} isLoading={isLoading} />
          </div>
        </div>  
      </div>
    </motion.div>
  )
}