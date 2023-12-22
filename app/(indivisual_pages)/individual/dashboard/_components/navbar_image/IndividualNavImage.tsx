import { useUserData } from '@/components/data/dataFether';
import Image from 'next/image';
import React from 'react'

export default function IndividualNavImage() {
  const { data: userData  } = useUserData();

  return (
    <div className='sidebar_img_container w-10 h-10 rounded-full border border-gray-300  overflow-hidden'>
      { userData?.image ? (<Image
        src={userData?.image} 
        width={100}
        height={100}
        alt="" 
        className='sidebar_img object-contain'
      />) : (
        (<Image
          src="/assets/images/default-user-img.jpeg" 
          width={100}
          height={100}
          alt="" 
          className='sidebar_img object-contain'
        />)
      )}
    </div>
  )
}
