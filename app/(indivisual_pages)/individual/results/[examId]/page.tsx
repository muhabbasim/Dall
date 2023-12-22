'use client'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { FolderTree, Warehouse } from 'lucide-react';
import StatusChart from '../_components/Status';
import { ProgressBar } from '../_components/ProgressBar';
import PieChart from '../_components/PieChart';
import RadialChart from '../_components/RadialChart';
import RadarCharts from '../_components/RadarChart';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import api from '@/context/apiRequest';
import Lottie from "lottie-react";
import loader from '../_components/loader.json'
import loader2 from '../_components/loader2.json'
import loader3 from '../_components/loader3.json'
import process from '../_components/process.json'
import Image from 'next/image';


type ResultSymbolProps = {
  id: number;
  letter: string;
  first_major: string;
  second_major: string; 
  first_job: string;
  second_job: string;
  description: string;
  hoppy: string;
  diploma: string;
}

type ResultProps = {
  symbol: ResultSymbolProps;
  desire: string;
  first_major_percentage: number;
  second_major_percentage: number;
  firstExamChart: [];
  secondExamChart: [];
  thirdExamChart: [];
}

const SubChartData = [
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
    pv: 12908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 10800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 13800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 5300,
    amt: 2100,
  },
];

const MainChartData = [
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
    pv: 12908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 10800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 13800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 15300,
    amt: 2100,
  },
];

export default function IndividualResults({ params } : { params: { examId: number } }) {

  const { examId } = params;
  const [ processResult, setProcessResult ] = useState<boolean>(false);

  const { data: result } = useQuery({
    queryKey: ['results'],
    queryFn: async () => 
    await api.get(`/individual/exam/${examId}/result`).then((res) => {
      return res.data as ResultProps;
    })
  })

  const academicChartData = result?.firstExamChart;
  const socialChartData = result?.secondExamChart;
  const behaviouralChartData = result?.thirdExamChart;


  useEffect(() => {
    setProcessResult(true)
  }, [])

  setTimeout(() => {
    setProcessResult(false)
  }, 5000);

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: .3,
        delay: 1
      }} 
      className='w-full flex gap-8 justify-between'
    >
      <div className='relative w-full'>
        { processResult ? (
          <div className='w-full h-[80vh] border rounded-lg flex flex-col items-center justify-center bg-white'>
            <Lottie loop={true} animationData={loader2}/>
            <h1>Processing your result...</h1>
          </div> 

        ) : (

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

            <div className='questions-container p-6 md:p-20'>

              <div className="result_body flex flex-col gap-10">

                <div className="result_specialization flex flex-col gap-10 ">
                  <div className='border shadow-md hover:shadow-lg p-4 rounded-sm flex justify-center items-center'>
                    <h1 className='md:w-[70%] md:text-center'>The following results are the majors and professions that are compatible with your academic and professional abilities and inclinations</h1>
                  </div>

                  <div className='result_state_container py-10'>
                    <StatusChart
                      isSub={false}
                      Icon={Warehouse}
                      title={'Main-speciality'}
                      percentage={result?.first_major_percentage}
                      data={MainChartData}
                      specialty={result?.symbol?.first_major}
                      />
                    <StatusChart 
                      isSub={true}
                      Icon={FolderTree}
                      title='Sub-speciality'
                      data={SubChartData}
                      specialty={result?.symbol.second_major}

                      />
                    <StatusChart 
                      isSub={false}
                      Icon={Warehouse}
                      title='Main profession'
                      percentage={result?.second_major_percentage}
                      data={MainChartData}
                      specialty={result?.symbol.first_job}
                      />
                    <StatusChart 
                      isSub={true}
                      Icon={FolderTree}
                      title='Sub-profession'
                      data={SubChartData}
                      specialty={result?.symbol.second_job}
                      />
                  </div>

                  <div className='w-full border rounded-sm hover:shadow-lg shadow-md'>
                    <div className='flex justify-center items-center'>
                      <h1 className='md:w-[70%] p-4 rounded-md md:text-center'>
                        The compatibility ratio of the personal desire entered by the beneficiary <span className='text-rose-900'>(Chemist)</span> with your capabilities, and its measurement through artificial intelligence along with test results
                      </h1>
                    </div>
                    <div className=' flex items-center justify-center'>
                      <ProgressBar/>
                    </div>
                  </div>
                </div>

                <Separator className='w-full px-10 h-[1px] my-10'/>


                <div className="result_chatrs space-y-10 ">
                  <div className=' p-4 rounded-sm  border  shadow-md hover:shadow-lg flex justify-center items-center'>
                    <h1 className='md:w-[70%] md:text-center'>The following chart presents the percentage of your scientific inclinations in four academic paths: Computer Science and Technology, Sharia and Social Sciences, and Health and Life Sciences</h1>
                  </div>

                  <div className='result_chart_state_container pt-10'>
                    <div className='flex flex-col items-center'>
                      <h1 className='font-bold text-gray-600'>Academic abilities</h1>
                      <div className=''>
                        <PieChart data={academicChartData}/>
                      </div>
                    </div>
                    <div className='flex flex-col items-center'>
                      <h1 className='font-bold text-gray-600'>Social abilities</h1>
                      <div>
                        <RadialChart data={socialChartData}/>
                      </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <h1 className='font-bold text-gray-600'>Skills and behavioral abilities</h1>
                      <div>
                        <RadarCharts data={behaviouralChartData}/>
                      </div>
                    </div>
                  </div>
                  
                </div>

                <Separator className='w-full px-10 h-[1px] my-10'/>


                <div className="result_percentage">
                  <div className='bg-yellow-100 p-4 rounded-sm flex justify-center items-center'>
                    <h1 className='md:w-[60%] md:text-center'>The accuracy rate in results, according to scientific standards and experiments, reaches up to <span className='text-rose-800'>83.6%</span></h1>
                  </div>

                  <div className="items-top flex justify-center items-center space-x-4 pt-10">
                    <Checkbox defaultChecked id="terms1" className='w-6 h-6'/>
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Permission to publish my data for employment purposes.
                      </label>
                      
                    </div>
                  </div>
                </div>

                <div className="footer w-full h-72 flex md:mt-10 items-center justify-center">
                  <div>
                    <h1 className='pl-8 font-bold text-cyan-700'>This Exam is licenced by</h1>
                    <Image
                      src={'/assets/images/licence.jpeg'}
                      height={600}
                      width={800}
                      alt='licence'
                    />
                  </div>

                </div>

              </div>
            </div>
          </div>  
        )}
      </div>
    </motion.div>
  )
}
