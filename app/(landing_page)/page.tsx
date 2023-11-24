import FAQ from '@/app/(landing_page)/_components/FAQ/FAQ'
import BottomBar from '@/app/(landing_page)/_components/bottom_bar/BottomBar'
import Comments from '@/app/(landing_page)/_components/comments/Comments'
import ContactUs from '@/app/(landing_page)/_components/contact_us/ContactUs'
import Footer from '@/app/(landing_page)/_components/footer/Footer'
import Generals from '@/app/(landing_page)/_components/hero/Generals'
import Hero from '@/app/(landing_page)/_components/hero/Hero'
import Projects from '@/app/(landing_page)/_components/projects/Projects'
import Services from '@/app/(landing_page)/_components/services/Services'
import Vision from '@/app/(landing_page)/_components/visions/Vision'
import React from 'react'

export default function Home() {

  return (
    <div className='relative w-full'>
      <div className='absolute'>
        <Hero />
      </div >

      <Generals />
      <Vision />
      <Services/>
      <Projects/> 
      <div className='wrapper'>
        <FAQ/>
        <Comments/>
      </div>
      <ContactUs/>
      <div className='absolute'>
        <BottomBar/>
      </div>
      <Footer/>
 
    </div>
  )
}