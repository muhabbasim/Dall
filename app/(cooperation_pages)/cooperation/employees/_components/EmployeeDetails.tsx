'use client'
import { AuthContext } from '@/context/authContext'
import '../employeesStyle.css'
import api from '@/context/apiRequest'
import { useQuery } from '@tanstack/react-query'
import { Ban, Building2, Camera, Check, Cross, Loader2, Mail, Phone, X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type element = {
  id: number;
  arabic_name: string;
}

type UserDetailsProps = {
  id: number;
  name: string;
  birth_city: element;
  birth_country: element;
  birth_date: string;
  education_institute: element;
  education_level: element;
  email: string;
  experience_years: element;
  gender: element;
  image: string;
  is_verified: boolean;
  major: element;
  nationality: element;
  occupation: element;
  phone: string;
  residence_city: element;
  residence_country: element;
  verification: boolean;
}

export default function EmployeeDetails({ userId }) {

  const { currentUser } = useContext(AuthContext);
  const { data: user, isError, isLoading } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => 
    await api.get(`company/individuals/${userId}/show`).then((res) => {
      return res.data?.data as UserDetailsProps;
    })
  })
  
  // console.log(typeof(user?.verification))
  
  return (
    <>
      { isLoading ? 
        ( <div className=' w-full h-full flex items-center justify-center'>
            <div className='flex items-center justify-center gap-2'>
              <Loader2 className="mr-2 h-10 w-10 text-cyan-700 animate-spin" />
              <h1>Loading data...</h1>
            </div>
          </div>
        ) : isError ? (
          <div className='w-full h-full flex items-center justify-center'>
            <div className='flex items-center justify-center gap-2'>
              <Ban className="mr-2 h-10 w-10 text-rose-700" />
              <h1>No services</h1>
            </div>
          </div>
        ) : (

          <div className='box w-full pt-6'>
  
            {/* Box */}
            <div className='box1 hidden md:inline bg-white shadow-md rounded-xl'>
              <div className='image_container flex justify-center w-full h-full p-8'>
                <div className=' flex flex-col justify-center  gap-5 items-center '>
                  <div className='relative sidebar_img_container w-40 h-40 rounded-full overflow-hidden'>
                    <Image
  
                      src="/assets/images/indivisual_img.avif" 
                      width={200}
                      height={200}
                      alt="personal image" 
                      className='sidebar_img object-cover'
                    />
                    <div className='absolute z-100 top-0 left-0 shadow-xl bg-background/20 rounded-full w-40 h-40 flex items-center justify-center cursor-pointer transition-all'>
                      <div className='text-white flex flex-col items-center justify-between gap-2'>
                        <Camera className=''/>
                        <h1 className='text-sm text-center'>Click to change the photo</h1>
                      </div>
                    </div>
                  </div>
                  <div className=''>
                    <h3 className='font-bold'>{(user?.name)?.toUpperCase()}</h3>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Box */}
            <div className='box2 flex flex-col gap-6 bg-white shadow-md rounded-xl p-8'>
              
              <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='w-full flex flex-col gap-2'>
                  <h3 className='text-gray-400'>Residence country </h3>
                  <Button variant='ghost' className='w-full border text-gray-700 bg-slate-100/60 '>
                    <Input
                      className='w-full bg-transparent border-none '
                      readOnly
                      defaultValue={user?.residence_country?.arabic_name}
                    />
                  </Button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <h3 className='text-gray-400'>Residence city </h3>
                  <Button variant='ghost' className='w-full border text-gray-700 bg-slate-100/60 '>
                    <Input
                      className='w-full bg-transparent border-none '
                      readOnly
                      defaultValue={user?.residence_city?.arabic_name}
                    />
                  </Button>
                </div>
              </div>

              <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='w-full flex flex-col gap-2'>
                  <h3 className='text-gray-400'>Education institutaion </h3>
                  <Button variant='ghost' className='w-full border text-gray-700 bg-slate-100/60 '>
                    <Input
                      className='w-full bg-transparent border-none '
                      readOnly
                      defaultValue={user?.education_institute?.arabic_name}
                    />
                  </Button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <h3 className='text-gray-400'>Education level </h3>
                  <Button variant='ghost' className='w-full border text-gray-700 bg-slate-100/60 '>
                    <Input
                      className='w-full bg-transparent border-none '
                      readOnly
                      defaultValue={user?.education_level?.arabic_name}
                    />
                  </Button>
                </div>
              </div>
              
              <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='w-full flex flex-col gap-2'>
                  <h3 className='text-gray-400'>Occupation </h3>
                  <Button variant='ghost' className='w-full border text-gray-700 bg-slate-100/60 '>
                    <Input
                      className='w-full bg-transparent border-none '
                      readOnly
                      defaultValue={user?.occupation?.arabic_name}
                    />
                  </Button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <h3 className='text-gray-400'>Experience </h3>
                  <Button variant='ghost' className='w-full border text-gray-700 bg-slate-100/60 '>
                    <Input
                      className='w-full bg-transparent border-none '
                      readOnly
                      defaultValue={user?.experience_years?.arabic_name}
                    />
                  </Button>
                </div>
              </div>


                <div className='w-full flex flex-col gap-2'>
                  <h3 className='text-gray-400'>Gender </h3>
                  <Button variant='ghost' className='w-full border text-gray-700 bg-slate-100/60 '>
                    <Input
                      className='w-full bg-transparent border-none '
                      readOnly
                      defaultValue={user?.gender?.arabic_name}
                    />
                  </Button>
                </div>
         

              <div className=' flex flex-col gap-2'>
                <h3 className= 'w-32 text-gray-400'>Verification </h3>
                <Button variant='ghost' 
                  className={cn(`borde text-teal-600 bg-slate-100/60`,
                    !user?.verification && 'text-rose-900' 
                  )}
                  
                >
                  {user?.verification ? (
                    <Check/>
                  ) : (
                    <X/>
                  )}
                  <Input
                    className='w-full bg-transparent border-none '
                    readOnly
                    defaultValue={user?.verification && user?.verification ? "Confirmed" : "Not confirmed"}
                  />
                </Button>
              </div>
            </div>
  
            {/* Box */}
            <div className='box1 hidden md:flex flex-col justify-center gap-6 bg-white shadow-md rounded-xl p-8'>
              <div className=' text-gray-400 flex items-center gap-4'>
                <Mail className=''/>
                <h3 className=''>{user?.email}</h3>
              </div>
              <div className=' text-gray-400 flex items-center gap-4'>
                <Phone className=''/>
                <h3 className=''>{user?.phone}</h3>
                <div className='w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center'>
                  <Check className='text-white w-5 h-5'/>
                </div>
              </div>
              <div className=' text-gray-400 flex items-center gap-4'>
                <Building2 className=''/>
                <h3 className=''>{currentUser?.name}</h3>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}