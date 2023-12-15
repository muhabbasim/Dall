'use client'
import './indivisualDashboard.css';
import React, { useContext, useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { AlertTriangle, Expand, GraduationCap, ShieldAlert, TvIcon } from 'lucide-react';
import DashDataTable from './dashbord_data_table/DashDataTable';
import { motion } from 'framer-motion'
import { AuthContext } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import api from '@/context/apiRequest';
import { columns } from './dashbord_data_table/DashColumns';
import IndividualStates from './_components/IndividualStates';



export default function IndividualDashboard() {

  const [ tableData, setTableData ] = useState([]);

  const { data: perviousExam } = useQuery({
    queryKey: ['pervious_exams'],
    queryFn: async () => 
    await api.get(`/individual/user-prev-exams`).then((res) => {
      return res.data?.data;
    })
  })

  const { currentUser } = useContext(AuthContext);
  const isVerified = currentUser?.is_verified
  const [ verification, setVerification ] = useState(false); 

  useEffect(() => {
    setTableData(perviousExam)
  }, [perviousExam])

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
        <IndividualStates/>

        <div className='min-h-[400px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Pervious Exams</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>
          {verification && (
            <div className='bg-yellow-300 flex justify-center items-center'>
              <AlertTriangle className='text-gray-700'/>
              <h1 className='p-3'>
                Completing profile information is requeired for starting an exam! 
              </h1>
            </div>
          )}

          <div className='p-20'>
            <DashDataTable isVerified={isVerified} setVerification={setVerification} columns={columns} data={tableData || []}/>
          </div>

        </div>  
      </div>
    </motion.div>
  )
}