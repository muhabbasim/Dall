import React from 'react'
import { Fingerprint, LucideIcon, Package } from "lucide-react";
import './serviceStyle.css'
import {motion} from 'framer-motion'
import Link from 'next/link'
import { 
  Dialog,
  DialogTrigger,
  DialogContent
} from './dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';


type ServiceProps = {
  id: number;
  icon: LucideIcon;
  label: string;
  desc: string;
  fullDesc: string;
  img: string;
  href: string;
}

type Services = {
  service: ServiceProps
}

export default function CardDetails({ service } : Services) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='cursor-pointer'>More details</div>
      </DialogTrigger>
      <DialogContent className="w-full">
        <div className='w-full'>
          <div className=' rounded-lg bg-white'>
            <div>
              <div className='flex p-10'>
                <motion.div 
                 initial={{ y: 100, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{
                   duration: .3,
                   delay: .1
                 }} 
                  className='left min-h-[500px] flex items-center justify-end z-50 -mr-28 w-[40%]'
                >
                  <div className='w-full overflow-hidden rounded-sm'>
                    <img
                      alt="indivisual dash image"
                      src={service.img} 
                      className="object-cover w-[1000px] h-[500px]"
                    />

                  </div>
                </motion.div>
                <div className='service_details_right min-h-[550px] px-16 py-10 w-[60%] flex gap-16 justify-center rounded-sm'>

                  <div className=' min-h-[550px] w-full h-full px-16 flex flex-col justify-center '>
                    <div className='flex gap-10 justify-center'>
                      <Separator className='w-[1px] h-[400px] opacity-30'/>
                      <div className=''>
                        <motion.h1 
                          initial={{ y: -50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: .3,
                            delay: .1
                          }}
                          className='service_details_title md:text-4xl font-bold'
                        >
                          {service.label}
                        </motion.h1>

                        <motion.p
                          initial={{ y: -50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: .3,
                            delay: .5
                          }} 
                          className=' text-gray-200 pt-10'
                        >
                          {service.fullDesc}
                        </motion.p>
                        <motion.div 
                          initial={{ x: 100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: .3,
                            delay: .7
                          }}
                          className='pt-10 space-y-1'
                        >
                          <div
                            className=" flex flex-row items-center gap-3"
                          >
                            <div className=' rounded-full p-1 text-white'>
                              <Package className='text-cyan-500'/>
                            </div>
                            <h2 className='text-gray-300 text-sm'>Lorem ipsum dolor sit amet.</h2>
                          </div>
                          <div
                            className=" flex flex-row items-center gap-3"
                          >
                            <div className=' rounded-full p-1 text-white'>
                              <Package className='text-cyan-500'/>
                            </div>
                            <h2 className='text-gray-300 text-sm'>Lorem ipsum dolor sit amet.</h2>
                          </div>
                          <div
                            className=" flex flex-row items-center gap-3"
                          >
                            <div className=' rounded-full p-1 text-white'>
                              <Package className='text-cyan-500'/>
                            </div>
                            <h2 className='text-gray-300 text-sm'>Lorem ipsum dolor sit amet.</h2>
                          </div>
                        
                        </motion.div>
                        <div className='flex w-full items-end justify-end mt-10'>
                          <Link href={cn(` ${service.href}/${service.id} `)}>
                            <button 
                              className='w-48 bg-cyan-500 text-white p-3 rounded-sm flex gap-2 items-start justify-center'
                            >
                              <Fingerprint/>
                              Subscribe now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                 
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
