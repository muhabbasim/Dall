'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function page() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: .3,
        delay: .1
      }} 
      className='w-full flex gap-8 justify-between'
    >
      <div className='w-full'>

        <div className='min-h-[500px] border rounded-lg bg-white'>
          {/* <div className=' w-full  p-5'>
            <h1 className=' font-bold text-slate-600'>Introduction</h1>
          </div> */}
          {/* <Separator className='w-full px-10 h-[1px]'/> */}

          <div>
            <div className='flex gap-10 p-10'>
              <motion.div 
                // initial={{ x: -100, opacity: 0 }}
                // animate={{ x: 0, opacity: 1 }}
                // transition={{
                //   duration: 1,
                //   // delay: .5
                // }}  
                className='left flex-1'
              >
                <div className='w-full h-full'>
                  <img
                    alt="indivisual dash image"
                    src="/assets/images/02.png" 
                    className="object-cover w-full"
                  />

                </div>
              </motion.div>
              <div className='right flex-1 flex flex-col gap-16 justify-center'>
                <div>
                  <motion.h1 
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      // delay: .5
                    }}  
                    className='exam_intro_title md:text-4xl font-bold'
                  >
                    Capabilities measurement.
                  </motion.h1>

                  <motion.p 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: .2
                    }} 
                    className='text-gray-600 pt-10'
                  >
                    This exam designed to assist students and job seekers by analyzing the needs of the job market, individuals capabilities, and connecting them through artificial intelligence algorithms
                  </motion.p>
                  <div className='pt-4 space-y-2'>
                    <motion.div
                      initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      // duration: 1,
                      delay: .6
                    }} 
                    className=" flex flex-row items-center gap-3">
                      <div className=' bg-sky-100 rounded-full p-1 text-sky-800'>
                        <Check/>
                      </div>
                      <h2 className='text-gray-500 text-sm'>Lorem ipsum dolor sit amet.</h2>
                    </motion.div>
                    <motion.div
                      initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      // duration: 1,
                      delay: .7
                    }} 
                    className=" flex flex-row items-center gap-3">
                      <div className=' bg-sky-100 rounded-full p-1 text-sky-800'>
                        <Check/>
                      </div>
                      <h2 className='text-gray-500 text-sm'>Lorem ipsum dolor sit amet.</h2>
                    </motion.div>
                    <motion.div
                      initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      // duration: 1,
                      delay: .8
                    }} 
                    className=" flex flex-row items-center gap-3">
                      <div className=' bg-sky-100 rounded-full p-1 text-sky-800'>
                        <Check/>
                      </div>
                      <h2 className='text-gray-500 text-sm'>Lorem ipsum dolor sit amet.</h2>
                    </motion.div>
                  </div>
                </div>
                <div className='flex w-full justify-end'>
                  <Link href={'/payment'}>
                    <Button
                      className='w-40'
                      variant={'default'}
                    >
                      Buy now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>  
      </div>
    </motion.div>
  )
}
