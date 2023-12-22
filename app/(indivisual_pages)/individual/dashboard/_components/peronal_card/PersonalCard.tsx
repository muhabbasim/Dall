import { useUserData } from '@/components/data/dataFether';
import { MoreVertical, Pencil } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

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

  const { data: userData } = useUserData();
  
  return (
    <div className='w-[260px] h-[700px] bg-white rounded-lg border p-8'>
      <div className='flex justify-between items-center '>
        <h1>My profile</h1>
        <MoreVertical className=' cursor-pointer'/>
      </div>

      <div className='relative flex flex-col gap-5 items-center mt-10'>
        <div className='sidebar_img_container w-36 h-36 border border-gray-300 rounded-full overflow-hidden'>
        { userData?.image ? (<Image
            src={userData?.image} 
            width={200}
            height={200}
            alt="" 
            className='sidebar_img object-contain'
          />) : (
            (<Image
              src="/assets/images/default-user-img.jpeg" 
              width={200}
              height={200}
              alt="" 
              className='sidebar_img object-contain'
            />)
          )}
        </div>
    
        <div className='text-center'>
          <h2>{userData?.first_name} <span className='font-bold'>{userData?.second_name}</span></h2>
          <h3 className='text-gray-400 text-sm'>{userData?.email}</h3>
          <h3 className='text-gray-400 text-sm'>{userData?.phone}</h3>
          <h3 className='text-gray-900 text-sm mt-5'>{userData?.joined_at}</h3>
          <p className='text-gray-400 text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, veniam!</p>
        </div>
      </div>
      
    </div>
  )
}
