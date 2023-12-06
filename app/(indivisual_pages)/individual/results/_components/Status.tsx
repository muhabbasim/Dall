import React, { PureComponent }  from 'react'
import {motion} from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Warehouse } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusChartProps = {
  data: any;
  title: string;
  specialty: string;
  isSub: boolean;
  Icon?: any;
  percentage?: string;
}

export default function StatusChart({ data, title, specialty, Icon, isSub, percentage }: StatusChartProps) {
  return (
    <div className='status md:min-w-[380px] border rounded-md w-60 p-2 shadow-md'>
      <div className='flex gap-6 items-center justify-around'>
        <div className=' transform rotate-45'>
          <div className={cn(` bg-sky-700 p-2 h-10 rounded-lg flex  items-center justify-center${isSub && ' bg-teal-700 '}`)}>
            <Icon className='text-white transform -rotate-45'/>
          </div>
        </div>
        <div>
          <h1 className={cn(`font-bold ${isSub && ' text-rose-800'}`)}>{title}</h1>
            <div className='flex justify-between'>
              <h2 className='text-slate-600 text-sm'>
                {specialty}
              </h2>
              {!isSub && (
                <span className=''>%{percentage}</span>
              )}
            </div>
          <div className='pt-2'>
            <LineChart width={150} height={50} data={data}>
              <Line type="monotone" dataKey="pv" strokeWidth={2} />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  )
}
