'use client'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import api from '@/context/apiRequest'
import { Ban, Loader2 } from 'lucide-react'
import Service_status from '../_components/ServiceStatus'
import ServiceEmployeeDataTable from '../_components/service_employee_data_table/ServiceEmployeeDataTable'
import { columns } from '../_components/service_employee_data_table/ServiceEmployeeDataColumns'
import { useDispatch, useSelector } from 'react-redux'
import { fetchService } from '@/app/redux/service_details/ServiceSlide'
import Spinner from '@/components/spinner/Spinner'
import { AppState } from '@/app/redux/store'
type individualsProps = {
  name: string;
  email: string;
  image: string;
  phone: string;
  verification: boolean;
  is_verified: boolean;
}

type ServiceDetailsProps = {
  id: number;
  name: string;
  description: string;
  seats: number;
  excepted_individuals: number;
  individuals_count: number;
  status: string;
  start: string;
  end: string;
  created_at: string;
  individuals: individualsProps[]
  url: string;
}

export default function ServiceDetails({ params }: { params: { serviceId: number }}) {
  

  const serviceId = params.serviceId;
  const dispatch = useDispatch();
  const [ refresh, setRefresh ] = useState<boolean>(false);

  const { data: serviceDetails, isError, isLoading } = useQuery({
    queryKey: ['services_details'],
    queryFn: async () => 
    await api.get(`/company/services/${serviceId}/show`).then(res => {
      return res.data?.data;
    })
  }) 
  const registeredUsers: individualsProps[] = serviceDetails?.individuals


  useEffect(() => {
    setRefresh(true)
  }, [])

  setTimeout(() => {
    setRefresh(false)
  }, 500);


  return (

    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: .3,
        delay: .1
      }} 
      className='w-full flex gap-8 justify-center'
    >
      <div className='w-full'>

        <div className='min-h-[700px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Service Details</h1>
          </div>

          {refresh ? (
            <div className=' w-full h-[700px] flex items-center justify-center'>
              <div className='flex items-center justify-center gap-2'>
                <Loader2 className="mr-2 h-10 w-10 text-cyan-700 animate-spin" />
                <h1>Loading data...</h1>
              </div>
            </div>
          ) : (
            <>
              <Separator className='w-full px-10 h-[1px]'/>
              <div className='p-6 md:py-10 md:px-20'>
                <Service_status service={serviceDetails!}/>
                <Separator className='w-full px-10 h-[1px]'/>

                <div  className='py-20'>
                  <ServiceEmployeeDataTable 
                    isError={isError} 
                    isLoading={isLoading} 
                    columns={columns} 
                    data={registeredUsers ||[]}
                  />
                </div>
              </div>
            </>
          )}
        </div>  
      </div>
    </motion.div>
  

  )
}
