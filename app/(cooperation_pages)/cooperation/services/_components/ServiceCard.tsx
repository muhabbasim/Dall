import { Separator } from '@/components/ui/separator';
import { ChevronRight, LucideIcon } from 'lucide-react';
import React from 'react'
import CardDetails from './CardDetails';

type ServiceFeaturesProps = {
  desc: string;
}

type ServiceProps = {
  id: number;
  icon: LucideIcon;
  label: string;
  desc: string;
  fullDesc: string;
  img: string;
  href: string;
  features: ServiceFeaturesProps[];
}

type Service = {
  service: ServiceProps
}
export default function ServiceCard({ service } : Service ) {
  return (
    <div key={service.id} className='service_card min-h-[450px] border px-6 py-10 rounded-lg shadow-md transition-all'>
      <div className='space-y-6'>
        <service.icon strokeWidth={1} className='service_icon w-20 h-20 text-cyan-500'/>
        <h1 className='service_title h-20 font-bold text-2xl text-blue-900'>{service.label}</h1>
      </div>
      <Separator className='w-full px-10 h-[1px] my-6'/>
      <div className='space-y-6'>
        <h1 className='service_desc text-slate-600  text-sm'>{service.desc}</h1>
        <div className='flex gap-4 items-center justify-end'>
          <span className='service_explore text-cyan-500 text-sm'>
            <CardDetails service={service}/>
          </span>
          <div className='explore_icon rounded-full text-white bg-cyan-500 p-1 cursor-pointer'>
            <ChevronRight/>
          </div>
        </div>
      </div>
    </div>
  )
}
