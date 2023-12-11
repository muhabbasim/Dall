"use client"
import '../style.css'
import { ReactNode } from "react"

import { motion } from 'framer-motion'
import Header from './_components/co_header/Header'
import PersonalCard from './_components/co_peronal_card/PersonalCard'


export default function layout({ children } : {
  children: ReactNode
}) {
  return (
    <div className='indivisual_Dashboard_container min-h-[92vh] w-full py-5 pr-10 pl-12 space-y-6'>
      <div className='h-[40px]'>
        <Header/>
      </div>
      <div className='flex gap-8'>
        <main className='w-[80%] h-full'>
          {children}
        </main>
        <div className='hidden md:inline rounded-lg'>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: .4,
            delay: .5
          }}  
        >
          <div className=' sticky top-0'>
            <PersonalCard/>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  )
}



