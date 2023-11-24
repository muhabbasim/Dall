'use client'

import React from 'react'
import Link from "next/link";
import '../register.css'
import { Building2, UserCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  firstname: z.string().min(1, 'Fistname is required'),
  lastname: z.string().min(1, 'Lastname is required'),
  
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  confirm_pasword: z.string().min(1, {
    message: "confirm password must be at least 5 characters.",
  }),
  phonen_number: z.string().min(1, {
    message: "Phone must be at least 5 characters.",
  }),
  email: z.string().min(1, {
    message: "Email must be at least 5 characters.",
  }).email('Invalid Email'),

})
export default function CoorporateForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      password: "",
      confirm_pasword: "",
      phonen_number: "",
      email: "",
    },
  })
  const { isSubmitting, isValid } = form.formState;

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }


  return (
    <div className='register_inputs w-full h-full flex-1 md:p-16 p-5 '>
      <h1 className='text-center pb-3 text-2xl text-rose-500 font-bold pt-10 md:pt-0'>Coorporate register</h1>

      <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="space-y-2 mt-5 md:h-[500px] overflow-y-scroll"
          >
          
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isSubmitting}
                      placeholder="e.g. 'Google Inc"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/> 
                </FormItem>
              )}
            />
            <div className='flex flex-col md:flex-row flex-wrap gap-5 w-full'>
              <div className='w-full flex-1'>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={isSubmitting}
                          placeholder="e.g. 'Saudi Arabia'"
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
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={isSubmitting}
                          placeholder="e.g. 'Ryiadh'"
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
                  <FormLabel>Adress Line</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isSubmitting}
                      placeholder="e.g. '2566 Dow ST, Box 168'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/> 
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phonen_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departments</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isSubmitting}
                      placeholder="e.g. Finiance, Marketing"
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
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input
                        type='email'
                        // disabled={isSubmitting}
                        placeholder="e.g. 'google@gmail.com'"
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
                  name="confirm_pasword"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Employyees No</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          // disabled={isSubmitting}
                          placeholder="Add a number"
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
              name="phonen_number"
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
                        placeholder="Enter password"
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
                  name="confirm_pasword"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={isSubmitting}
                          placeholder="Comfirm password"
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

      <h1 className=''>You already have an account? <Link className='text-rose-400' href={'/login'}>Log In</Link></h1>
    </div>
  )
}
