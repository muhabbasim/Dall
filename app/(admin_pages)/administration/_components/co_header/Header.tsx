import { Button } from '@/components/ui/button'
import { LayoutDashboard, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Header() {

  const pathName = usePathname()
  const router = useRouter()
  // const [ title, setTitle ]  = useState('');

  const isDashboard = pathName?.includes('dashboard')
  const isPfofile = pathName?.includes('profile')
  const isConsultation = pathName?.includes('consultation')
  const isExamProfile = pathName?.includes('exam_intro')
  const isExamQuestions = pathName?.includes('exams')
  const isResultPage = pathName?.includes('results')

  let title;

  if(isDashboard) {
    title = 'Dashboard'
  } else if (isPfofile) {
    title = 'Profile'
  } else if (isConsultation) {
    title = 'Consultation'
  } else if (isExamProfile) {
    title = 'Dall_In Eaxamination'
  } else if (isExamQuestions) {
    title = 'Exams Questions'
  } else if (isResultPage) {
    title = 'Exam Result'
  }
  
  return (
    <div className='h-full w-full flex justify-between'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-bold text-slate-600'>{title}</h1>
      </div>

      <div className=' flex  gap-5'>
        {/* { isDashboard && (
          <Link href={'/indivisual/exam_intro'}>
            <Button variant={'default'} className=' rounded-full p-5 flex items-center'>
              <PlusCircle className='mr-2'/>
                New exam
            </Button>
          </Link>
        )} */}
        <Link href={'/individual/dashboard'}>
          <Button variant={'secondary'} className='rounded-full p-5 flex items-center'>
            {/* <LayoutDashboard className='mr-2'/> */}
            Home page
          </Button>
        </Link>
      
      </div>  
      
    </div>
  )
}
