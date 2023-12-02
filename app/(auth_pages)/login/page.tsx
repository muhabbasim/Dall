"use client"

import './login.css'
import React, { useContext, useEffect, useState } from 'react'
import Link from "next/link";
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AuthContext } from '@/context/authContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';


const formSchema = z.object({
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  email: z.string().min(1, {
    message: "Email must be at least 5 characters.",
  }).email('Invalid Email'),

})



export default function Login() {

  const { login } = useContext(AuthContext)
  const router = useRouter();
  const [ err, setErr ] = useState('')
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  })
  const { isSubmitting, isValid } = form.formState;

  const userToken = typeof window !== 'undefined' ? localStorage.getItem('dallUserToken') : null;

  const submitForm = async (values: z.infer<typeof formSchema>) => {

    try {
      
      await login(values)
      toast.success('Logged in successfully')
      router.push('/indivisual/dashboard')

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
        toast.error(err)
      }
      console.log(error);
    }
  }


  return (
    <div className=' w-full md:min-h-[600px] flex justify-center rounded-xl overflow-hidden'>
     
      <div className='right flex md:w-[60%] bg-white'>
        
        <div className='register_side_menu space-y-32 py-14 md:px-6 px-4 shadow shadow-black-400'>
          <div className=" flex justify-center items-center">
            <Link href={'/'}>
              <img 
                src="/assets/logo.png" 
                alt="logo bar image" 
                className='h-10 w-10 cursor-pointer opacity-70 hover:opacity-100 transition-all md:h-14 md:w-14' 
              />
            </Link>
          </div>
        </div>

        <div className='register_inputs w-full h-full flex-1 p-16 flex flex-col justify-center'>
          <h1 className='text-center pb-3 text-2xl text-rose-500 font-bold pt-10 md:pt-0'>Login</h1>

          <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitForm)}
                className="space-y-2 mt-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. Waleed@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/> 
                    </FormItem>
                  )}
                />

                  <div className='w-full flex-1'>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                            type='password'
                            autoComplete='no'
                            disabled={isSubmitting}
                            placeholder="Enter your password"
                            {...field}
                            />
                          </FormControl>
                          <FormMessage/> 
                        </FormItem>
                      )}
                    />
                  </div>

                <div className="flex gap-x-2 items-end justify-end">
                  <Button
                    className=' w-32 my-6'
                    variant={'login'}
                    type="submit"
                    onClick={() => submitForm}
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </div>
              </form>
          </Form>

          <h1>You already have an account? <Link className=' text-rose-400' href={'/register'}>Register</Link></h1>
        </div>
      </div>

      <div className='login_img_container hidden md:inline left md:w-[40%]'>
        <div className='flex h-full flex-col justify-between gap-10 py-20 px-10'>
          <h1 className='text-3xl text-white font-bold'>Welcom to Dall <span className=''></span> </h1>
          <p className='text-white text-xl'>whe measurement of capabilities is the foundation of success!</p>
        </div>
        
      </div>
    </div>
  )
}
