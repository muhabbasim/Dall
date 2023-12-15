'use client'

import React, { useContext, useState } from 'react'
import Link from "next/link";
import '../register.css'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import { AxiosError } from 'axios' 

const formSchema = z.object({
  first_name: z.string().min(1, 'Fistname is required'),
  last_name: z.string().min(1, 'Lastname is required'),
  
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string().min(1, 'Password comfirmation is required').min(8, 'Password must be the same as the password'),
  phone: z.string().min(1, {
    message: "Phone must be at least 5 characters.",
  }),
  email: z.string().min(1, {
    message: "Email must be at least 5 characters.",
  }).email('Invalid Email'),

})


export default function IndivisualForm() {
  
  const [ err, setErr ] = useState('')
  const { register, currentUser } = useContext(AuthContext);
  const router = useRouter();
 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      phone: "",
      email: "",
    },
  })

  if ( currentUser ) {
    router.push('/')
    return;
  }


  const { isSubmitting, isValid } = form.formState;

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    const { password, password_confirmation } = values;

    try {

      if (password !== password_confirmation ) {
        toast.error('Password does not match password comfirmation')
        return
      }

      await register(values)

      toast.success('Account creaated successfully')
      router.push('/')
      
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data.message)
        toast.error(err)

      }
      console.log(error);
    }
  }

   
 
  return (
    <div className='register_inputs w-full h-full flex-1 md:p-16 p-5'>
      <h1 className='text-center pb-3 text-2xl text-rose-500 font-bold pt-10 md:pt-0'>Create an account</h1>
      <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="space-y-2 mt-5 md:h-[500px] overflow-y-scroll"
          >
          
            <div className='flex flex-col md:flex-row flex-wrap gap-5 w-full'>
              <div className='w-full flex-1'>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={isSubmitting}
                          placeholder="e.g. 'Waleed'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/> 
                    </FormItem>
                  )}
                />
              </div>

              <div className='w-full flex-1'>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={isSubmitting}
                          placeholder="e.g. 'Musha'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/> 
                    </FormItem>
                  )}
                />
              </div>

            </div>
              
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isSubmitting}
                      placeholder="e.g. Waleed@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/> 
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isSubmitting}
                      placeholder="e.g. +966 335 3423"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/> 
                </FormItem>
              )}
            />

            <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
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
                        // disabled={isSubmitting}
                        placeholder="e.g. 'Waleed Musha'"
                        {...field}
                        />
                      </FormControl>
                      <FormMessage/> 
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full flex-1'>
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={isSubmitting}
                          placeholder="Enter Password"
                          {...field}
                          />
                      </FormControl>
                      <FormMessage/> 
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="items-top flex space-x-4 pt-6">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept <Link className=' underline text-destructive ' href={''}>terms</Link> and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>

            <div className="flex gap-x-2 items-end justify-end">
              <Button
                className=' w-32 my-6'
                variant={'login'}
                type="submit"
                onClick={() => submitForm}
                // disabled={!isValid || isSubmitting}
              >
                Register
              </Button>
            </div>
          </form>
      </Form>

      <h1>You already have an account? <Link className='text-rose-400' href={'/login'}>Log In</Link></h1>
    </div>
  )
}
