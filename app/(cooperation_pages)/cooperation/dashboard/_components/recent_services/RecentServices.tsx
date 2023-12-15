import { cn } from '@/lib/utils'
import { Group, PackageCheck } from 'lucide-react'
import React from 'react'
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
export default function RecentServices() {
  return (
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
  )
}
