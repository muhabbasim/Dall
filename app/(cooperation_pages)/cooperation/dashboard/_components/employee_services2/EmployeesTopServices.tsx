'use client'
import '../../style.css'
import React from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'


const data = [
  {
    "name": "HR",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Finance",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Marketing",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Tech",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Management",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Engineering",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Production",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

export default function EmployeesTopService() {
  return (
    <div className='border col-span-2 rounded-lg p-4'>
      <div className='flex items-center justify-center'>
        <AreaChart width={730} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </div>
    </div>
  )
}
