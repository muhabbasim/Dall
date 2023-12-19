'use client'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import {motion} from 'framer-motion'
import { FolderTree, Warehouse } from 'lucide-react';
import StatusChart from '../_components/Status';
import { ProgressBar } from '../_components/ProgressBar';
import PieChart from '../_components/PieChart';
import RadialChart from '../_components/RadialChart';
import RadarCharts from '../_components/RadarChart';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/context/apiRequest';


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function IndividualResults({ params } : { params: { examId: number } }) {

  const { examId } = params;
  
  const { data } = useQuery({
    queryKey: ['results'],
    queryFn: async () => 
    await api.get(`/individual/exam/${examId}/result`).then((res) => {
      return res.data
    })
  })

  

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: .3,
        delay: 1
      }} 
      className='w-full flex gap-8 justify-between '
    >
      <div className='w-full'>
        <div className='min-h-[700px] border rounded-lg bg-white '>
          <div className=' w-full p-5 flex justify-between'>
            <div className='flex gap-4'>
              <h1 className='text-md text-rose-700'>Results for <span className='text-gray-600 font-bold'>Emanuell</span></h1>
            </div>
            <div className='flex gap-2'>
              <h1 className=' font-bold text-slate-600'>Congratulations!!</h1>
            </div>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          <div className='questions-container p-20'>

            <div className="result_body flex flex-col gap-10">

              <div className="result_specialization flex flex-col gap-10 ">
                <div className='bg-yellow-200 p-4 rounded-sm flex justify-center items-center'>
                  <h1 className='w-[70%] text-center'>The following results are the majors and professions that are compatible with your academic and professional abilities and inclinations</h1>
                </div>

                <div className='w-full flex flex-wrap justify-center py-10 gap-10'>
                  <StatusChart
                    isSub={false}
                    Icon={Warehouse}
                    title='Main speciality'
                    percentage='90'
                    data={data}
                    specialty='Engineering'
                    />
                  <StatusChart 
                    isSub={true}
                    Icon={FolderTree}
                    title='Sub-speciality'
                    data={data}
                    specialty='Doctor'
                    />
                  <StatusChart 
                    isSub={false}
                    Icon={Warehouse}
                    title='Main profession'
                    percentage='70'
                    data={data}
                    specialty='Architecture'
                    />
                  <StatusChart 
                    isSub={true}
                    Icon={FolderTree}
                    title='Sub-profession'
                    data={data}
                    specialty='Surgent'
                    />
                </div>

                <div className='w-full bg-slate-100 '>
                  <div className='flex justify-center items-center'>
                    <h1 className='w-[70%] p-4 rounded-md text-center'>
                      The compatibility ratio of the personal desire entered by the beneficiary <span className='text-blue-700'>(Chemist)</span> with your capabilities, and its measurement through artificial intelligence along with test results
                    </h1>
                  </div>
                  <div className=' flex items-center justify-center'>
                    <ProgressBar/>
                  </div>
                </div>
              </div>

              <Separator className='w-full px-10 h-[1px] my-10'/>


              <div className="result_chatrs space-y-10 ">
                <div className='bg-gray-800 p-4 rounded-sm flex justify-center items-center'>
                  <h1 className='w-[70%] text-center text-white'>The following chart presents the percentage of your scientific inclinations in four academic paths: Computer Science and Technology, Sharia and Social Sciences, and Health and Life Sciences</h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 pt-10'>
                  <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-gray-600'>Academic abilities</h1>
                    <div>
                      <PieChart/>
                    </div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-gray-600'>Social abilities</h1>
                    <div>
                      <RadialChart/>
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-bold text-gray-600'>Skills and behavioral abilities</h1>
                    <div>
                      <RadarCharts/>
                    </div>
                  </div>
                </div>
                
              </div>

              <Separator className='w-full px-10 h-[1px] my-10'/>


              <div className="result_percentage">
                <div className='bg-yellow-100 p-4 rounded-sm flex justify-center items-center'>
                  <h1 className='w-[60%] text-center'>The accuracy rate in results, according to scientific standards and experiments, reaches up to 88%.</h1>
                </div>

                <div className="items-top flex justify-center items-center space-x-4 pt-6">
                  <Checkbox id="terms1" className='w-7 h-7'/>
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Permission to publish my data for employment purposes.
                    </label>
                    
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>  
      </div>
    </motion.div>
  )
}
