'use client'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'

import {motion} from 'framer-motion'
import DashDataTable from './consultation_data_table/ConsultaionDataTable'
import { columns } from './consultation_data_table/ConsultationColumns'
import { useQuery } from '@tanstack/react-query'
import api from '@/context/apiRequest'

export type Exam = {
  id: string
  status: string
  isCompleted: Boolean
  isStarted: Boolean
  created_at: string
}


export default function page() {

  const [ tableData, setTableData ] = useState([]);

  const { data: perviousConsultation} = useQuery({
    queryKey: ['pervious_consultation'],
    queryFn: async () => 
    await api.get(`/individual/consultations`).then((res) => {
      return res.data?.data;
    })
  })


  useEffect(() => {
    setTableData(perviousConsultation)
  }, [perviousConsultation])


  
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
            <DashDataTable columns={columns} data={tableData || []}/>
          </div>

        </div>  
      </div>
    </motion.div>
  )
}
