import React from 'react'
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button"

import { Check } from 'lucide-react'
import Link from 'next/link'
import { 
  Dialog,
  DialogTrigger,
  DialogContent
} from './dialog';


type ServiceProps = {
  icon: LucideIcon;
  label: string;
  desc: string;
  img: string;
  href: string;
}

type Services = {
  service: ServiceProps
}

export default function ServiceDetails({ service } : Services) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>More details</div>
      </DialogTrigger>
      <DialogContent className="w-full">
        <div className='w-full'>
          <div className=' rounded-lg bg-white'>
            <div>
              <div className='flex gap-10 p-10'>
                <div 
                  className='left flex-1'
                >
                  <div className='w-[500px] h-full'>
                    <img
                      alt="indivisual dash image"
                      src={service.img} 
                      className="object-cover w-full"
                    />

                  </div>
                </div>
                <div className='right flex-1 flex flex-col gap-16 justify-center'>
                  <div>
                    <h1 
                      className='exam_intro_title md:text-4xl font-bold'
                    >
                      {service.label}
                    </h1>

                    <p 
                      className='text-gray-600 pt-10'
                    >
                      {service.desc}
                    </p>
                    <div className='pt-4 space-y-2'>
                      <div
                         
                      className=" flex flex-row items-center gap-3">
                        <div className=' bg-sky-100 rounded-full p-1 text-sky-800'>
                          <Check/>
                        </div>
                        <h2 className='text-gray-500 text-sm'>Lorem ipsum dolor sit amet.</h2>
                      </div>

                      <div
                        className=" flex flex-row items-center gap-3"
                      >
                        <div className=' bg-sky-100 rounded-full p-1 text-sky-800'>
                          <Check/>
                        </div>
                        <h2 className='text-gray-500 text-sm'>Lorem ipsum dolor sit amet.</h2>
                      </div>
                      <div
                      className=" flex flex-row items-center gap-3">
                        <div className=' bg-sky-100 rounded-full p-1 text-sky-800'>
                          <Check/>
                        </div>
                        <h2 className='text-gray-500 text-sm'>Lorem ipsum dolor sit amet.</h2>
                      </div>
                    </div>
                  </div>
                  <div className='flex w-full justify-end'>
                    <Link href={service.href}>
                      <Button
                        className='w-40'
                        variant={'default'}
                      >
                        Subscribe now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>  
        </div>
      </DialogContent>
    </Dialog>
  )
}
