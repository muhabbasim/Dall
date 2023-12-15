import { Expand, GraduationCap, TvIcon } from 'lucide-react'
import React from 'react'
import './style.css'
export default function DashboardStates() {
  return (
    <div className='cooperation_dashboard_state_container'>
      <div className='box2 py-4 px-4 cursor-pointer bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shasdow shadow-sm'>
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
        className='box2 py-4 px-4 cursor-pointer bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shadow-sm'
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
        className='box2 py-4 px-4 cursor-pointer bg-white w-full h-26 border rounded-lg flex items-center justify-around gap-5  shadow-sm'
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
  )
}
