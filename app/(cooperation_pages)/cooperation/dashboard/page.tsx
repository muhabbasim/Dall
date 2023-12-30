'use client'
import React, { useContext } from 'react'
import './style.css'
import { motion } from 'framer-motion'

import { EmployeesTable } from './_components/employees_table/employeesTable';
import Employees_services from './_components/employee_services/Employees_services';
import EmployeesTopService from './_components/employee_services2/EmployeesTopServices';
import DashboardStates from './_components/dashboard_states/DashboardStates';
import RecentServices from './_components/recent_services/RecentServices';
import AreaChart from './_components/Area_charts/AreaChart';
import ColumnChart from './_components/column_chart/ColumnChart';



export default function CooperationDashboard() {

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

          <div className='p-5 flex flex-col gap-4'>
            <DashboardStates/>

            <div className="box">

              <div className='box2'>
                <ColumnChart/> 
              </div>
              
              <div className='box2'>
                <RecentServices/>
              </div>
              <div className='responsive_chart box3'>
                <AreaChart/>
              </div>
              <div className='box1'>
                <EmployeesTable/>
              </div>

            </div>
          </div>
        </div>  
      </div>
    </motion.div>
  )
}

