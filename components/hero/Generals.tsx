'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowBigRight } from 'lucide-react'
import { Separator } from '../ui/separator'
import './style.css'
import Vision from '../visions/Vision'
import HorizentalWrapper from '../HorizentalWrapper'

export default function Generals() {

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
    <div className={`flex flex-col items-end pt-60 w-full md:px-48 ${blurBackground && 'blur_background'}`}>
 
      <div className=' text-white md:max-w-[70%] flex flex-col items-end  space-y-6 text-right'>
        <h1 className='text-7xl'>قياس القدرات أساس النجاح</h1>
        {/* <h1 className='text-7xl'>قياس قدرات الافراد وربطهم بالتخصصات الجامعية وسوق العمل من خلال ملف واحد</h1> */}
        <h4 className='text-2xl'>منصة تهدف لمساعدة الطلاب والباحثين عن عمل من خلال تحليل احتياجات سوق العمل وقدرات الأفراد وربطهم من خلال خوارزميات الذكاء الاصطناعي</h4>
        <div className='space-x-6'>
          <Button variant={'destructive'} className='px-16 py-6 text-lg'>
            !انضم إلينا 
          </Button>
          <Button className='px-16 py-6 text-black' variant={'outline'}>
            أفراد 
          </Button>
        </div>
      </div>

      <HorizentalWrapper 
        height='40rem'
        direction={-700}
      >
        <div className=" absolute flex flex-col gap-6  mt-28 w-full py-10 md:flex-row justify-around items-center backdrop-blur-md text-right rounded-lg">
          <div className='flex flex-col justify-center items-center gap-4  cursor-pointer'>
            <h4 className='text-3xl text-opacity-50 text-white'>شركات</h4>
            <h1 className='text-lg text-white'>خدمات خاصة بالمنشئات</h1>
            {/* <div className='border rounded-[50%] p-2 text-white'>
              <ArrowBigRight/>
            </div> */}
          </div>
          <Separator className='h-32 opacity-40' orientation="vertical"/>
          <div className='hero_card flex flex-col justify-center items-center gap-4  cursor-pointer'>
            <h4 className='text-3xl text-opacity-50 text-white'>
              أفراد
            </h4>
            <h1 className='text-lg text-white'>خدمات خاصة بالأفراد</h1>
            {/* <div className='border rounded-[50%] p-2 text-white'>
              <ArrowBigRight/>
            </div> */}
          </div>
          <Separator className=' h-32 opacity-40' orientation="vertical"/>
          <div className='flex flex-col justify-center items-center gap-4  cursor-pointer'>
            <h4 className='text-3xl text-opacity-50 text-white'>
              إدارات
            </h4>
            <h1 className='text-lg text-white'>خدمات خاصة بالإدارات</h1>
            {/* <div className='border rounded-[50%] p-2 text-white'>
              <ArrowBigRight />
            </div> */}
          </div>
        </div>
      </HorizentalWrapper>
      
      <div className=' text-white min-h-[100vh]'>
        <Vision />
      </div>

    </div>
  )
}



// import React from 'react'
// import { Button } from '../ui/button'
// import { ArrowBigRight } from 'lucide-react'
// import { Separator } from '../ui/separator'

// export default function Generals() {
//   return (
//     <div className='relative w-full h-[100vh]'>
 
//       <div className='absolute md:pr-48 top-1/4 right-0 text-white md:max-w-[70%] flex flex-col items-end  space-y-6 text-right'>
//         <h1 className='text-7xl'>اختبارات قياس قدرات الأشخاص</h1>
//         <h4 className='text-2xl'>منصة تهدف لمساعدة الطلاب والباحثين عن عمل من خلال تحليل احتياجات سوق العمل وقدرات الأفراد وربطهم من خلال خوارزميات الذكاء الاصطناعي</h4>
//         <div className='space-x-6'>
//           <Button variant={'destructive'} className='px-16 py-6 text-lg'>
//             !انضم إلينا 
//           </Button>
//           <Button className='px-16 py-6' variant={'outline'}>
//             أفراد 
//           </Button>
//         </div>
//       </div>

//       <div className="flex flex-col gap-6 w-full h-[200px] md:px-72 absolute top-[70%] md:flex-row justify-around items-center backdrop-blur-md text-right rounded-lg">
//         <div className='flex flex-col justify-center items-center gap-4  cursor-pointer'>
//           <h4 className='text-3xl text-opacity-50 text-white'>شركات</h4>
//           <h1 className='text-lg text-white'>خدمات خاصة بالمنشئات</h1>
//           <div className='border rounded-[50%] p-2 text-white'>
//             <ArrowBigRight/>
//           </div>
//         </div>
//         <Separator className='h-28 opacity-10' orientation="vertical"/>
//         <div className='hero_card flex flex-col justify-center items-center gap-4  cursor-pointer'>
//           <h4 className='text-3xl text-opacity-50 text-white'>
//             أفراد
//           </h4>
//           <h1 className='text-lg text-white'>خدمات خاصة بالأفراد</h1>
//           <div className='border rounded-[50%] p-2 text-white'>
//             <ArrowBigRight/>
//           </div>
//         </div>
//         <Separator className='h-28 opacity-10' orientation="vertical"/>
//         <div className='flex flex-col justify-center items-center gap-4  cursor-pointer'>
//           <h4 className='text-3xl text-opacity-50 text-white'>
//             إدارات
//           </h4>
//           <h1 className='text-lg text-white'>خدمات خاصة بالإدارات</h1>
//           <div className='border rounded-[50%] p-2 text-white'>
//             <ArrowBigRight />
//           </div>
//         </div>
//       </div>
      
//       <div className='h-[100vh] text-white'>
//         helow
//       </div>
//     </div>
//   )
// }
