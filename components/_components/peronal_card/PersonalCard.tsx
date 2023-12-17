import { AuthContext } from '@/context/authContext'
import { MoreVertical, Pencil } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

type InputProps = {
  id: number;
}

interface User {

  //single user
  first_name: string | undefined;
  second_name: string;
  last_name: string;
  email: string;
  phone: string | undefined;
  
  birth_country: number & InputProps;
  birth_city: number & InputProps;
  birth_date: string;
  residence_country: number & InputProps;
  residence_city: number & InputProps;
  genders: number & InputProps;
  nationality: number & InputProps;
  
  education_institute: number & InputProps;
  education_level: number & InputProps;
  major: number & InputProps;
  experience_years: number & InputProps;
  occupation: number & InputProps;
  skills: number;
  is_verified: boolean;

  // cooperations user
  name: string | undefined;
  staff: number;
  address: string;
  password: string;
  password_confirmation: string;
  departments: number;
  country: number & InputProps;
  city: number & InputProps;
  role: string;
}


export default function PersonalCard() {

  const  [ userData, setUserData ] = useState<User | null>();
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    setUserData(currentUser)
  }, [])

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
    
        <div className='text-center'>
          <h2>{userData?.first_name || userData?.name} <span className='font-bold'>{userData?.second_name}</span></h2>
          <h3 className='text-gray-400 text-sm'>{userData?.email}</h3>
          <h3 className='text-gray-400 text-sm'>{userData?.phone}</h3>
          <h3 className='text-gray-900 text-sm mt-5'>Join on 17 Des 2023</h3>
          <p className='text-gray-400 text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, veniam!</p>
        </div>
      </div>
      
    </div>
  )
}
