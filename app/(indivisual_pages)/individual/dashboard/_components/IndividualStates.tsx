'use client'
import React from 'react'
import { Expand, GraduationCap, TvIcon } from 'lucide-react';
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query';
import api from '@/context/apiRequest';

export default function IndividualStates({ examsData }) {


  const { data: consultation } = useQuery({
    queryKey: ['pervious_consultation'],
    queryFn: async () => 
    await api.get(`/individual/consultations`).then((res) => {
      return res.data?.data;
    })
  })

  const examNumber = examsData?.length
  const consultationNumber = consultation?.length

  return (
    <motion.div 
      className=' individual_dashboard_state_container  flex gap-5 justify-between'
    >
      <div
        className='indivisual_status  cursor-pointer text-white bg-white w-full py-3 border rounded-lg flex items-center justify-around gap-5 shasdow shadow-lg'
      >

        <div>
          <h1 className='text-sm'>
            Exams
          </h1>
          <h1 className='text-2xl font-bold'>
            { examNumber ? examNumber : "0"}
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
        className='indivisual_status  cursor-pointer text-white bg-white w-full py-3 border rounded-lg flex items-center justify-around gap-5  shadow-lg'
      >
          <div>
          <h1 className='text-sm'>
            Consultation
          </h1>
          <h1 className='text-2xl font-bold'>
          { consultationNumber ? consultationNumber : "0"}
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
        className='indivisual_status  cursor-pointer text-white bg-white w-full py-3 border rounded-lg flex items-center justify-around gap-5  shadow-lg'
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
