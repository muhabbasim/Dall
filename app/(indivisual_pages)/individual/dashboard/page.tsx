'use client'
import './indivisualDashboard.css';
import React, { useContext, useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { AlertTriangle, Expand, GraduationCap, ShieldAlert, TvIcon } from 'lucide-react';
import DashDataTable from './dashbord_data_table/DashDataTable';
import { columns } from './dashbord_data_table/DashColumns';
import { motion } from 'framer-motion'
import { AuthContext } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import api from '@/context/apiRequest';

export type Payment = {
  id: string
  status: string
  isCompleted: Boolean
  isStarted: Boolean
  created_at: string
}

export type Exam = {
  id: string
  status: string
  isCompleted: Boolean
  isStarted: Boolean
  created_at: string
}

const data = [
  {
    id: "1",
    isCompleted: false,
    isStarted: false,
    status: "paid",
    created_at: "2032-12-1",
  },
  {
    id: "2",
    isCompleted: true,
    isStarted: true,
    status: "Waiting for payment",
    created_at: "2032-12-1",
  },
 
  {
    id: "3",
    isCompleted: false,
    isStarted: false,
    status: "failed",
    created_at: "2032-12-1",
  },
  {
    created_at: "2023-06-27",
    id: 4,
    isCompleted: false,
    isStarted: false,
    status: "waiting-for-payment"
  }
 
]

export default function page() {

  const [ tableData, setTableData ] = useState([]);

  const { data: perviousExam } = useQuery({
    queryKey: ['pervious_exams'],
    queryFn: async () => 
    await api.get(`/individual/user-prev-exams`).then((res) => {
      return res.data?.data;
    })
  })

  const { currentUser } = useContext(AuthContext);
  const isVerified = currentUser?.user.is_verified
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