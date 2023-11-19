'use client'

import React, { useRef } from 'react'
import './contact.css'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function ContactUs() {


  const addressElement = useRef(null);

  const { scrollYProgress } = useScroll({
    target: addressElement,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [1, 0.5, 0], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [1, 0.4, 0], [0, 0, 1000]);



  return (
    <div className='relative contact md:flex justify-center items-center h-[100vh] md:px-48 md:py-20'>
      <div className='  bg-white space-y-8 w-7/12 h-5/6 md:flex md:flex-col pl-20 pr-72 py-16 rounded-lg shadow-sm shadow-slate-600 '> 
        <h1 className='text-2xl text-bold'>SEND US A MESSAGE <span className='text-rose-500'>*</span></h1>
        <div>
          <div  className='flex flex-col gap-5'>
            <Input placeholder='Type your name'></Input>
            <Input placeholder='Type your email'></Input>
            <Textarea placeholder="Type your message here."/>
          </div>
          <div className='text-right'>
            <Button variant={'destructive'} className=' mt-10 w-32'>Send</Button>
          </div>
        </div>
      </div>

      <motion.div 
        ref={addressElement} 
        style={{ opacity, y}}
        className=' bg-gray-800 w-80 h-5/6 px-6 py-16 ml-[-200px] mt-[120px] rounded-lg shadow-sm shadow-slate-900 text-white space-y-7'>
        <div className='space-y-5'>
          <h1 className='text-3xl location_text'>DROP IN OUR OFFICE</h1>
          <p className='text-gray-400'>Our office is located in a beautiful building inside the busiest area in Makkah</p>
        </div>
        <div className='space-y-6'>
          <div className=''>
            <div className='flex gap-3 items-center'>
              <MapPin className='text-rose-200'/>
              <h4>Ho Chi Miani City</h4>
            </div>
            <p className=' text-xs pt-6 pl-6 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, porro!</p>
          </div>

          <div className='flex gap-3 items-center'>
            <Mail className='text-rose-200'/>
            <h4>Ho Chi Miani City</h4>
          </div>

          <div className='flex gap-3 items-center'>
            <Phone className='text-rose-200'/>
            <h4>+966 555 48373</h4>
          </div>
        </div>
      </motion.div >
    </div>
  )
}
