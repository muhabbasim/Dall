'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'



const EmployeesServices = [
  {
    "name": "Employee comparison",
    "employees": 4000,
    "complete": 2400
  },
  {
    "name": "Restructuring",
    "employees": 3000,
    "complete": 1398
  },
  {
    "name": "Search for employees",
    "employees": 2000,
    "complete": 800
  },
]

export default function Employees_services() {
  return (
    <div className='border rounded-lg p-2'>
      <div className=' w-full h-full flex items-center justify-center'>
        <BarChart  width={330} height={180} data={EmployeesServices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" className='text-xs' />
          <YAxis/>
          <Tooltip />
          <Legend className='text-xs'/>
          <Bar dataKey="employees" fill="#8884d8" />
          <Bar dataKey="complete" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  )
}
