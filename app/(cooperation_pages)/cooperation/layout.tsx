"use client"
import '../style.css'
import { ReactNode } from "react"
import Header from "../../../components/_components/header/Header"
import PersonalCard from '../../(indivisual_pages)/individual/dashboard/_components/peronal_card/PersonalCard'
import { motion } from 'framer-motion'
import CorporatePersonalCard from './dashboard/_components/corporate_peronal_card/CorporatePersonalCard'


export default function Layout({ children } : {
  children: ReactNode
}) {
  return (
    <div className='indivisual_Dashboard_container min-h-[92vh] w-full px-4 py-5 md:pr-10 md:pl-12 space-y-6'>
      <div className='h-[40px]'>
        <Header/>
      </div>
      <div className='flex gap-8'>
        <main className='responsive_child w-full h-full'>
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
            <div className='responsive_personalCard sticky top-0'>
              <CorporatePersonalCard/>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}



