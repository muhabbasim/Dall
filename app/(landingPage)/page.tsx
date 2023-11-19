import FAQ from '@/components/FAQ/FAQ'
import Visuals from '@/components/Visual_section/Visuals'
import BottomBar from '@/components/bottom_bar/BottomBar'
import Comments from '@/components/comments/Comments'
import ContactUs from '@/components/contact_us/ContactUs'
import Footer from '@/components/footer/Footer'
import Generals from '@/components/hero/Generals'
import Hero from '@/components/hero/Hero'
import Projects from '@/components/projects/Projects'
import Services from '@/components/services/Services'
import Vision from '@/components/visions/Vision'
import React from 'react'

export default function Home() {

  return (
    <div className='relative'>
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