import React from 'react'
import { Button } from '../../../../components/ui/button'
import { ArrowBigRight } from 'lucide-react'
import { Separator } from '../../../../components/ui/separator'

export default function Hero() {
  return (
    <div className='hero_before'>
      <video autoPlay loop muted
        className='w-full h-[100vh] object-cover fixed z-[-10]'
      >
        <source src="vid2.mov" />
      </video>
    </div>
  )
}
