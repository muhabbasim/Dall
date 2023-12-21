import React  from 'react'
import { LineChart, Line } from 'recharts';
import { cn } from '@/lib/utils';

type StatusChartProps = {
  data: any;
  title: string;
  specialty: string | undefined;
  isSub: boolean;
  Icon?: any;
  percentage?: number;
}

export default function StatusChart({ data, title, specialty, Icon, isSub, percentage }: StatusChartProps) {
  return (
    <div className='px-10 border rounded-lg py-4 hover:shadow-lg shadow-md hover:bg-gray-200/50 transition-all cursor-pointer'>
      <div className='flex gap-10 items-center justify-around'>
        <div className=' transform rotate-45'>
          <div className={cn(` bg-sky-700 p-2 h-10 rounded-lg flex items-center justify-center${isSub && ' bg-teal-700 '}`)}>
            <Icon className='text-white transform -rotate-45'/>
          </div>
        </div>
        <div className='w-full'>
          <h1 className={cn(`font-bold pb-2 ${isSub && ' text-rose-800'}`)}>{title}</h1>
            <div className='flex gap-4 justify-between'>
              <h2 className='text-slate-600 text-sm min-w-[100px]'>
                {specialty}
              </h2>
              {!isSub && (
                <span className=''>%{percentage}</span>
              )}
            </div>
          <div className='pt-4'>
            <LineChart width={150} height={50} data={data}>
              <Line type="monotone" dataKey="pv" strokeWidth={2} />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  )
}
