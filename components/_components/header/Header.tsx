import { Button } from '@/components/ui/button'
import { Layers3, LayoutDashboard, LayoutGrid, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Header() {

  const pathName = usePathname()
  const router = useRouter()
  // const [ title, setTitle ]  = useState('');
  
  const isCooperation = pathName?.includes('cooperation')

  const isDashboard = pathName?.includes('dashboard')
  const isPfofile = pathName?.includes('profile')
  const isConsultation = pathName?.includes('consultation')
  const isExamProfile = pathName?.includes('exam_intro')
  const isExamQuestions = pathName?.includes('exams')
  const isResultPage = pathName?.includes('results')
  const isServicesPage = pathName?.includes('services')
  const isEmployessPage = pathName?.includes('employees')

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
  } else if (isServicesPage) {
    title = 'Services'
  } else if (isEmployessPage) {
    title = 'Employees'
  }
  
  return (
    <div className='h-full w-full flex justify-between'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-bold text-slate-600'>{title}</h1>
      </div>

      <div className='flex gap-5'>
        {isCooperation && (
          <Link href={'/cooperation/services/dall_services'}>
            <Button variant={'secondary'} className=' p-5 border flex items-center'>
              <Layers3 strokeWidth={1} className='mr-2 text-cyan-500'/>
              Dall services
            </Button>
          </Link>
        )}

        <Link className='hidden md:inline' href={'/'}>
          <Button variant={'secondary'} className=' p-5 border flex items-center'>
            <LayoutGrid strokeWidth={1} className='mr-2 text-cyan-500'/>
            Home page
          </Button>
        </Link>
      </div>  
    </div>
  )
}
