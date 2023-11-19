'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import './style.css'
import HorizentalWrapper from '../HorizentalWrapper'
import { motion } from 'framer-motion'
import AnimatedText from '../AnimatedText'

export default function  Generals() {

  const [blurBackground, setBlurBackground] = useState(false);
  const changeVisibility = () => {
    if (window.scrollY >= 220) {
      setBlurBackground(true)
    } else {
      setBlurBackground(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', changeVisibility)
  })

  return (
    <div className={`flex flex-col pt-60 w-full md:px-48 ${blurBackground && 'blur_background'}`}>
 
      <div className='text-white md:max-w-[70%] flex flex-col space-y-6 z-20'>
        <AnimatedText
          el="h1"
          text={[
            "The measurement of capabilities is the foundation of success",
          ]}
          className="text-5xl"
          once
          // repeatDelay={10000}
        />
      
        {/* <h1 className='text-7xl'>قياس قدرات الافراد وربطهم بالتخصصات الجامعية وسوق العمل من خلال ملف واحد</h1> */}
        <motion.h4
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: .5
          }}
          className='text-2xl'
        >
          A platform designed to assist students and job seekers by analyzing the needs of the job market, individuals capabilities, and connecting them through artificial intelligence algorithms
        </motion.h4>

        <motion.div 
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 2
          }}
          className='space-x-6'
        >
          <button className='hero_btn px-16 py-3 text-lg rounded-lg'>
            Join us
          </button>
          <Button className='px-16 py-6 text-black' variant={'outline'}>
            Indiviuals
          </Button>
        </motion.div>
      </div>

      <HorizentalWrapper 
        height='40rem'
        direction={-700}
      >
        <motion.div 
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 5
          }}
          className=" absolute flex flex-col gap-6  mt-28 w-full py-10 md:flex-row justify-around items-center backdrop-blur-md rounded-lg"
        >
          <div className='flex flex-col justify-center items-center gap-4  cursor-pointer'>
            <h4 className='text-3xl text-opacity-50 text-white'>Coorperations</h4>
            <h1 className='text-lg text-white'>Cooperation services</h1>
            {/* <div className='border rounded-[50%] p-2 text-white'>
              <ArrowBigRight/>
            </div> */}
          </div>
          <Separator className='h-32 opacity-40' orientation="vertical"/>
          <div className='hero_card flex flex-col justify-center items-center gap-4  cursor-pointer'>
            <h4 className='text-3xl text-opacity-50 text-white'>
              Indivisuals
            </h4>
            <h1 className='text-lg text-white'> Indivisual services</h1>
            {/* <div className='border rounded-[50%] p-2 text-white'>
              <ArrowBigRight/>
            </div> */}
          </div>
          <Separator className=' h-32 opacity-40' orientation="vertical"/>
          <div className='flex flex-col justify-center items-center gap-4  cursor-pointer'>
            <h4 className='text-3xl text-opacity-50 text-white'>
              Managements 
            </h4>
            <h1 className='text-lg text-white'>Managemente services</h1>
            {/* <div className='border rounded-[50%] p-2 text-white'>
              <ArrowBigRight />
            </div> */}
          </div>
        </motion.div>
      </HorizentalWrapper>
      
  

    </div>
  )
}



