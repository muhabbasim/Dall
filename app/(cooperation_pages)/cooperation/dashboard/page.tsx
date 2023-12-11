'use client'
import './indivisualDashboard.css';
import React, { useContext, useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Expand, GraduationCap, Group, PackageCheck, TvIcon } from 'lucide-react';

import { motion } from 'framer-motion'
import { AuthContext } from '@/context/authContext';

import { useRouter } from 'next/navigation';
import { EmployeesTable } from './_components/employees_table/employeesTable';
import { NeoPie } from './_components/neo_pie/NeoPie';
import { cn } from '@/lib/utils';
import Employees_services from './_components/employee_services/Employees_services';
import EmployeesTopService from './_components/employee_services2/EmployeesTopServices';

const recentServices = [
  {
    "id": "lisp",
    "label": "Employee comparison",
    "value": 167,
    "color": "hsl(159, 70%, 50%)",
    desc: 'comparison',
    date: '2030',
    icon: <PackageCheck/>
  },
  {
    "id": "haskell",
    "label": "Restructuring",
    "value": 59,
    "color": "hsl(251, 70%, 50%)",
    desc: 'Reorder',
    date: '2021',
    icon: <Group/>
  },
 
]

export default function page() {

  
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

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
            <h1 className=' font-bold text-slate-600'></h1>
          </div>
          {/* <Separator className='w-full px-10 h-[1px]'/> */}
         

          <div className='p-5 flex flex-col gap-4'>
            <div className='h-[100px] flex gap-5 justify-between'>
              <div className='cursor-pointer bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shasdow shadow-sm'>

              <div>
                <h1 className='text-sm'>
                  Employees
                </h1>
                <h1 className='text-2xl text-gray-600 font-bold'>
                  73
                </h1>
                <p className='text-sm text-gray-400'>
                  total number
                </p>
              </div>
              <div className='h-full pt-4'>
                <TvIcon className=' text-blue-400 h-8 w-8'/>
              </div>
              
              </div>
              <div
              
                className='cursor-pointer bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shadow-sm'
              >
                <div>
                  <h1 className='text-sm'>
                    Results submited
                  </h1>
                  <h1 className='text-2xl text-gray-600 font-bold'>
                    33
                  </h1>
                  <p className='text-sm text-gray-400'>
                    total results
                  </p>
                </div>
                <div className='h-full pt-4'>
                  <Expand className=' text-blue-400 h-8 w-8'/>
                </div>
            
              </div>
              <div 
                
                className='cursor-pointer bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shadow-sm'
              >
                <div>
                  <h1 className='text-sm'>
                    Avarage Employees experice
                  </h1>
                  <h1 className='text-2xl text-gray-600 font-bold'>
                    73%
                  </h1>
                  <p className='text-sm text-gray-400'>
                    total results
                  </p>
                </div>
                <div className='h-full pt-4'>
                  <GraduationCap className=' text-blue-400 h-8 w-8'/>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              <div className='grid grid-cols-2 gap-4 col-span-2'>
                <div className='border rounded-lg p-2'>
                  <Employees_services/>
                </div>

                <div className='border rounded-lg p-2 '>
                  <div className='flex items-center p-4'>
                    <h1 className='font-bold'>Recent services</h1>
                  </div>
                  <div>
                    {recentServices ?
                     recentServices.map((service, i) => (
                      <div key={i} className='flex gap-3 h-16 w-full cursor-pointer rounded-full hover:bg-blue-100 hover:text-white p-4'>
                        <div className='flex w-full items-center gap-4'>
                          <div className={cn(`text-blue-500 bg-white shadow-md p-3 rounded-full`, i === 1 && "text-green-500")}>
                            {service.icon}
                          </div>
                          <div>
                            <h1>{service.label}</h1>
                            <h2 className='text-xs text-gray-400'>{service.desc}</h2>
                          </div>
                        </div>
                        <div className='flex items-center'>
                          <h2 className='text-xs text-gray-400'>{service.date}</h2>
                        </div>
                      </div>
                    )) : (
                      <div className=' flex justify-center items-center'>
                        <h1>No services found</h1>
                      </div>
                    )}
                  </div>
                </div>
              
                <div className='border col-span-2 rounded-lg p-4'>
                  <EmployeesTopService/>
                </div>
              </div>
              <div className=''>
                <div className='border p-4 rounded-lg shadow-sm'>
                  <EmployeesTable/>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </motion.div>
  )
}