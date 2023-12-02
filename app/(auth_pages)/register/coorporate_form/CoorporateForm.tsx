'use client'

import React, { useContext, useEffect, useState } from 'react'
import Link from "next/link";
import '../register.css'
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';

const formSchema = z.object({
  company_name: z.string().min(1, 'company_name is required'),
  company_country: z.number().min(1, 'company_country is required'),
  company_city: z.number().min(1, 'company_city is required'),
  company_address: z.string().min(1, 'company_address is required'),
  company_departments: z.string().min(1, 'company_departments is required'),
  company_staff: z.string().min(1, 'company_staff is required'),

  company_phone: z.string().min(1, {message: "Phone must be at least 5 characters."}),
  company_email: z.string().min(1, {message: "Email must be at least 5 characters."}).email('Invalid Email'),

  company_password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  company_password_confirmation: z.string().min(1, {
    message: "confirm password must be at least 5 characters.",
  }),

})

const languages = [
  { label: "English", value: "1" },
  { label: "French", value: "2" },
  { label: "German", value: "3" },
  { label: "Spanish", value: "4" },
  { label: "Portuguese", value: "5" },
  { label: "Russian", value: "6" },
  { label: "Japanese", value: "7" },
  { label: "Korean", value: "8" },
  { label: "Chinese", value: "9" },
] 

interface Country {
  arabic_name: string;
  code: string;
  english_name: string;
  id: number;
  isActive: number;
  phone_code: string;
}

interface CountriesArray {
  countries: Country[];
}



export default function CoorporateForm() {

  const { CooperationRegister } = useContext(AuthContext);
  const router = useRouter();

  const [ err, setErr ] = useState('');
  const [ countries, setContries ] = useState('');
  const [ Cities, setCities ] = useState('');

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      // company_country: "",
      // company_city: "",
      company_address: "",
      company_departments: "",
      company_email: "",
      company_staff: "",
      company_phone: "",
      company_password: "",
      company_password_confirmation: "",
    },
  })

  const { isSubmitting, isValid } = form.formState;

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    const { company_password, company_password_confirmation } = values;
    console.log(values)

    try {

      if (company_password !== company_password_confirmation ) {
        toast.error('Password does not match password comfirmation')
        return
      }

      await CooperationRegister(values)

      toast.success('Account creaated successfully')
      // router.push('/')

      
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data.message)
        toast.error(err)

      }
      console.log(error);
    }
    
  }


  const fetchData = async () => {

    const res = await axios.get('https://dall.app/api/get/countries')
    setContries(res.data)
    // console.log(res.data)
  }

  useEffect(() => {
    fetchData();

  }, [])


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
              name="company_name"
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

            <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
            <div className='w-full flex-1'>
              <FormField
                control={form.control}
                name="company_country"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className='py-1'>Company country</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? (Array.isArray(countries) ?
                                countries.find(country => country.id === field.value)?.english_name
                                : "")
                              : "Select country"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            { Array.isArray(countries) &&
                              countries.map((country) => (
                              <CommandItem
                                value={country.english_name}
                                key={country.id}
                                onSelect={() => {
                                  form.setValue("company_country", country.id)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {country.english_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full flex-1'>
              <FormField
                control={form.control}
                name="company_city"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className='py-1'>Company country</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? (Array.isArray(countries) ?
                                countries.find(country => country.id === field.value)?.english_name
                                : "")
                              : "Select country"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            { Array.isArray(countries) &&
                              countries.map((country) => (
                              <CommandItem
                                value={country.english_name}
                                key={country.id}
                                onSelect={() => {
                                  form.setValue("company_city", country.id)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {country.english_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            </div>
              
            <FormField
              control={form.control}
              name="company_address"
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
              name="company_departments"
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
                  name="company_email"
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
                  name="company_staff"
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
              name="company_phone"
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
                  name="company_password"
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
                  name="company_password_confirmation"
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
