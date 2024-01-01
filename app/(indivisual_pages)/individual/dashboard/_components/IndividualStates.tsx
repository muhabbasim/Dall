'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query';
import api from '@/context/apiRequest';
import Growth from './state_card/Growth';
import icon1 from '../../../../../public/assets/svgs/icon-connect.svg';
import icon2 from '../../../../../public/assets/svgs/icon-pie.svg';
import icon3 from '../../../../../public/assets/svgs/icon-tasks.svg';


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
        className='p-6 cursor-pointer text-slate-700 bg-white w-full py-3 border rounded-lg flex items-center justify-around gap-5 shasdow shadow-lg'
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
          <Growth Icon={icon3} color='#EEF5FF'/>
        </div>
      </div>
      <div
        className='p-6 cursor-pointer text-slate-700 bg-white w-full py-3 border rounded-lg flex items-center justify-around gap-5  shadow-lg'
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
          <Growth Icon={icon2} color='#FDF0F0'/>
        </div>
      
      </div>
      <div 
        className='  cursor-pointer text-slate-700 bg-white w-full p-6 border rounded-lg flex items-center justify-around gap-5  shadow-lg'
      >
        <div className='space-y-1'>
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
        <div className='h-full'>
          <Growth Icon={icon1} color='#DAFFFB'/>
        </div>
      </div>
      {/* <div>
        <Growth/>
      </div> */}
    </motion.div>
  )
}
