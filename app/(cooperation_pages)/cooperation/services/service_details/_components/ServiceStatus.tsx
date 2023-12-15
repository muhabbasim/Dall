import '../../service.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'


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
  url: string;
}

type ServiceProps = {
  service: ServiceDetailsProps
}

export default function Service_status({ service }: ServiceProps) {
  const [ copied, setCopied ] = useState<string>('')

  const handleCopied = () => {
    setCopied(service?.url)
    navigator.clipboard.writeText(service.url);
    toast.success('Url copied')
    setTimeout(() => setCopied(''), 3000);
  }


  return (
    <div className=''>
      <div className='service_state_container'>
        <div className='rounded-lg  h-46 p-4 border shadow-sm'>
          <h1 className='mb-8 font-bold'>Service Status:</h1>
          <div className=' space-y-2'>
            <div className='flex gap-3 items-center'>
              <h1 className='w-24'>Service:</h1>
              <h3 className='text-sm text-gray-400'>{service?.name}</h3>
            </div>
            <div className='flex gap-3 items-center'>
              <h1 className='w-24'>Payment:</h1>
              <h3 className='text-sm text-teal-600'>{service?.status}</h3>
            </div>
          </div>
        </div>

        <div className='rounded-lg  h-46 p-4 border shadow-sm'>
          <h1 className='mb-8 font-bold'>Employees Status:</h1>
          <div className=' space-y-2'>
            <div className='flex gap-3 items-center'>
              <h1 className='w-28'>Total Seats:</h1>
              <h3 className='text-sm text-blue-400'>{service?.seats}</h3>
            </div>
            <div className='flex gap-3 items-center'>
              <h1 className='w-28'>Registrated:</h1>
              <h3 className='text-sm text-gray-400'>{service?.individuals_count}</h3>
            </div>
            <div className='flex gap-3 items-center'>
              <h1 className='w-28'>Confiremd:</h1>
              <h3 className='text-sm text-teal-600'>{service?.excepted_individuals}</h3>
            </div>
          </div>
        </div>

        <div className='rounded-lg  h-46 p-4 border shadow-sm'>
          <h1 className='mb-8 font-bold'>Date Status:</h1>
          <div className=' space-y-2'>
            <div className='flex gap-3 items-center'>
              <h1 className='w-36'>Registration date:</h1>
              <h3 className='text-sm text-blue-400'>{service?.created_at}</h3>
            </div>
            <div className='flex gap-3 items-center'>
              <h1 className='w-36'>Start date:</h1>
              <h3 className='text-sm text-blue-400'>{service?.start}</h3>
            </div>
            <div className='flex gap-3 items-center'>
              <h1 className='w-36'>Expiration date:</h1>
              <h3 className='text-sm text-rose-600'>{service?.end}</h3>
            </div>
            
          </div>
        </div>
      </div>

      <div className='flex w-full border shadow-sm rounded-md my-6 px-4 py-2 justify-between items-center'>
        <div className='flex items-center gap-4'>
          <h1 className='text-rose-700'>Url:</h1>
          <h1>{service?.url}</h1>
        </div>
        <div className='cursor-pointer text-cyan-700 flex justify-end w-14'
          onClick={handleCopied}
        >
          <Image
            src={ copied === service?.url 
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={20}
            height={20}
            alt='copy image'
          />
        </div>
      </div>
    </div>
  )
}
