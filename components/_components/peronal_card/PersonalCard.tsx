import { MoreVertical, Pencil } from 'lucide-react'
import React from 'react'

export default function PersonalCard() {
  return (
    <div className='w-[260px] h-[700px] bg-white rounded-lg border p-8'>
      <div className='flex justify-between items-center '>
        <h1>My profile</h1>
        <MoreVertical className=' cursor-pointer'/>
      </div>

      <div className='relative flex flex-col gap-5 items-center mt-10'>
        <div className='sidebar_img_container w-36 h-36 rounded-full overflow-hidden'>
          <img 
            src="/assets/images/indivisual_img.avif" 
            alt="" 
            className='sidebar_img object-cover'
          />
          
        </div>
        {/* <div className='absolute top-28 right-8 shadow-xl bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:text-sky-600 transition-all'>
          <Pencil />
        </div> */}
        <div className='text-center'>
          <h2>Emanuell, <span className='font-bold'>Thani</span></h2>
          <h3 className='text-gray-400 text-sm'>Emanuellthani@dall.com</h3>
          <h3 className='text-gray-400 text-sm'>+966 347 2333</h3>
          <h3 className='text-gray-900 text-sm mt-5'>Join on 17 Des 2023</h3>
          <p className='text-gray-400 text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, veniam!</p>
        </div>
      </div>
      
    </div>
  )
}
