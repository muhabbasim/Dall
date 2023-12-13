'use client'
import React from 'react'
import './servicesStyle.css'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { ChevronRight, Layers3, LucideIcon, PackageCheck, Users } from 'lucide-react';
import ServiceDetails from '../_components/ServiceDetails'


type ServiceProps = {
  id: number;
  icon: LucideIcon;
  label: string;
  desc: string;
  fullDesc: string;
  img: string;
  href: string;
}

export default function page() {

  const services = [
    {
      id: 1,
      icon: PackageCheck,
      label: "Organization Restructuring Service",
      desc: "Navigate change successfully with our Organization Restructure service.",
      fullDesc: "An evaluation that provides detailed reports for employees within the company, focusing on their capabilities and compatibility within departments and across various sections of the organization. This service calculates an overall compatibility rate among employees and presents a final report to all employees, suggesting the best positions that align with their abilities and contribute to maximizing their productivity.",
      href: "/cooperation/services/services_form/reconstruction",
      img: 'https://images.unsplash.com/photo-1435575653489-b0873ec954e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      icon: Layers3,
      label: "Employee Comparison Service",
      desc: 'Enhance your workforce efficiency with our Employee Comparison service.',
      fullDesc: "A measurement tool that assists the recruitment department in selecting one or more employees with similar qualifications for a specific position. The assessment is based on the best alignment through various tests, ensuring that the selected candidates not only possess the required qualifications but also exhibit the highest compatibility for the job.",
      href: "/cooperation/services/services_form/comparision",
      img: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      icon: Users,
      label: "Employee Search Service",
      desc: "Simplify your recruitment process with our comprehensive Search for Employees service.",
      fullDesc: "A technological tool based on the analysis of companies' data needs and recruitment requirements, linking them with measurement results in our databases or collaborating entities. This service utilizes advanced data analysis to streamline the search for qualified candidates, ensuring a seamless match between company requirements and candidate profiles.",
      href: "/cooperation/services/services_form/employees_search",
      img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ];
  
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
        <div className='min-h-[600px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Available services</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          <div className='py-20 px-10 h-full flex flex-wrap gap-10 justify-around items-center'>

            {services.map((service: ServiceProps, i) => (
              <div key={i} className='service_card w-72 min-h-[450px] border px-6 py-10 rounded-lg shadow-md cursor-pointer transition-all'>
                <div className='space-y-6'>
                  <service.icon strokeWidth={1} className='service_icon w-20 h-20 text-cyan-500'/>
                  <h1 className='service_title h-20 font-bold text-2xl text-blue-900'>{service.label}</h1>
                </div>
                <Separator className='w-full px-10 h-[1px] my-6'/>
                <div className='space-y-6'>
                  <h1 className='service_desc text-slate-600  text-sm'>{service.desc}</h1>
                  <div className='flex gap-4 items-center justify-end'>
                    <span className='service_explore text-cyan-500 text-sm'>
                      <ServiceDetails service={service}/>
                    </span>
                    <div className='explore_icon rounded-full text-white bg-cyan-500 p-1'>
                      <ChevronRight/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
           
          </div>
        </div>  
      </div>
    </motion.div>
  )
}

