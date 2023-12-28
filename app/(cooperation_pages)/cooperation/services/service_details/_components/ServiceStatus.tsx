import '../../service.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Check, Copy } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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
          <h1 className='mb-4 font-bold'>Service Status:</h1>
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
          <h1 className='mb-4 font-bold'>Employees Status:</h1>
          <div className=' space-y-2'>
            <div className='flex gap-3 items-center'>
              <h1 className='w-28'>Total Seats:</h1>
              <h3 className='text-sm text-gray-400'>{service?.seats}</h3>
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
          <h1 className='mb-4 font-bold'>Date Status:</h1>
          <div className=' space-y-2'>
            <div className='flex gap-3 items-center'>
              <h1 className='w-36'>Registration date:</h1>
              <h3 className='text-sm text-gray-400'>{service?.created_at}</h3>
            </div>
            <div className='flex gap-3 items-center'>
              <h1 className='w-36'>Start date:</h1>
              <h3 className='text-sm text-gray-400'>{service?.start}</h3>
            </div>
            <div className='flex gap-3 items-center'>
              <h1 className='w-36'>Expiration date:</h1>
              <h3 className='text-sm text-rose-600'>{service?.end}</h3>
            </div>
            
          </div>
        </div>
      </div>

      <div className='flex w-full border shadow-sm rounded-md my-6 px-4 py-2 justify-between items-center'>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className='w-full'>
            <div className='flex items-center gap-4'>
              <h1 className='text-rose-700'>Url:</h1>
              <h1>{service?.url}</h1>
            </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to register to the service.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={service?.url}
                  readOnly
                />
              </div>
              <Button onClick={handleCopied} size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                { copied === service?.url 
                  ? (<Check className="h-4 w-4" />)
                  : (<Copy className="h-4 w-4" />)
                }
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
