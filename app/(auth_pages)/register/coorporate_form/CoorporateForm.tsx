
'use client'

import React, { useContext, useEffect, useState } from 'react'
import Link from "next/link";
import '../register.css'
import { Button } from "@/components/ui/button"
import { useQuery } from '@tanstack/react-query';

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
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthContext } from '@/context/authContext';
import { toast } from 'sonner';
import  { AxiosError } from 'axios';
import api from '@/context/apiRequest';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  company_name: z.string().min(1, 'company_name is required'),
  company_country: z.number().min(1, 'company_country is required'),
  company_city: z.number().min(1, 'company_city is required'),
  company_address: z.string().min(1, 'company_address is required'),
  company_departments: z.array(z.number()).min(1, 'company_departments is required'),
  company_staff: z.string().min(1, 'company_staff is required'),
  company_email: z.string().min(1, {message: "Email is required."}).email('Invalid Email'),
  company_password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  company_password_confirmation: z.string().min(1, 'Password comfirmation is required').min(8, 'Password must be the same as the password'),
  company_phone: z.string().min(1, {
    message: "Phone must be at least 10 characters.",
  }),

})


export default function CoorporateForm() {

  const [ err, setErr ] = useState('');
  const [ selectedDepartments, setSelectedDepartments ] = useState<number[]>([]); 

  const router = useRouter();
  const { CooperationRegister, currentUser } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      company_country: undefined,
      company_city: undefined,
      company_address: "",
      company_departments: undefined,
      company_email: "",
      company_staff: undefined,
      company_phone: '',
      company_password: '',
      company_password_confirmation: '',
    },
  })
  
  // get country
  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => 
    await api.get(`/get/countries`).then((res) => {
      return res.data;
    })
  })

  // get cities
  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => 
    await api.get(`/get/country-cities/${1}`).then((res) => {
      return res.data;
    })
  })

  // get departments
  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => 
    await api.get(`/get/departments`).then((res) => {
      return res.data;
    })
  })
  
  if( currentUser ) {
    router.push('/')
    return;
  }

  const handleDepartmentsOption = (item: number) => {
    setSelectedDepartments(selectedDepartments.includes(item)
    ? selectedDepartments.filter((options) => options !== item)
    : [...selectedDepartments, item])
  }



  const { isSubmitting, isValid } = form.formState;

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    const {company_departments, company_password_confirmation, company_password, ...otherValues } = values;

    console.log({...otherValues, company_departments: selectedDepartments})

    try {

      if (company_password !== company_password_confirmation ) {
        toast.error('Password does not match password comfirmation')
        return
      }

      await CooperationRegister({
        ...otherValues, 
        company_departments: selectedDepartments,
        company_password_confirmation,
        company_password
      })

      toast.success('Account creaated successfully');
      router.push('/cooperation/dashboard');
      router.refresh();

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data.message)
      }
      console.log(error);
    }
    
  }

  useEffect(() => {
    setTimeout(() => {
      setErr('')
    }, 4000);
  }, [err]) 


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
                      <FormLabel className='py-1'> Country</FormLabel>
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
                                countries.find(country => country.id === field.value)?.name
                                  : "")
                                : "Select country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                            { Array.isArray(countries) &&
                                countries.map((country) => (
                                <CommandItem
                                  value={country.name}
                                  key={country.id}
                                  onSelect={() => {
                                    form.setValue("company_country", country.id)
                                  }}
                                  // onChange={() => handleChange(country.id)}

                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      country.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {country.name}
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
                      <FormLabel className='py-1'>City</FormLabel>
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
                                ? (Array.isArray(cities) ?
                                  cities.find(city => city.id === field.value)?.name
                                  : "")
                                : "Select country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>No city found.</CommandEmpty>
                            <CommandGroup>
                            { Array.isArray(cities) &&
                                cities.map((city) => (
                                <CommandItem
                                  value={city.name}
                                  key={city.id}
                                  onSelect={() => {
                                    form.setValue("company_city", city.id)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      city.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.name}
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

          
            <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
              <div className='w-full flex-1'>
                <FormField
                  control={form.control}
                  name="company_departments"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className='py-1'>Departments</FormLabel>
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
                              <div className='flex h-full w-full gap-2 items-center'>
                                { selectedDepartments.length > 0 ?
                                  Array.isArray(departments) &&
                                  departments.map((department) => selectedDepartments.includes(department.id) && (
                                    <Badge 
                                      key={department.id}
                                      variant="secondary"
                                      className="mr-1 mb-1"
                                    >
                                      {department.name}
                                    </Badge>
                                  ) ) 
                                
                                : 'Selected departments'}
                              </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search Skills..." />
                            <CommandEmpty>No departments found.</CommandEmpty>
                            <CommandGroup>
                            { Array.isArray(departments) &&
                              departments.map((department) => (
                              <CommandItem
                                value={department.name}
                                key={department.id}
                                onSelect={() => {
                                  handleDepartmentsOption(department.id);
                                  form.setValue("company_departments", [...selectedDepartments, department.id])
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedDepartments.includes(department.id) ?
                                      "opacity-100" : "opacity-0")
                                    }
                                  />
                                {department.name}
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
                      type='number'
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

            {err && (
              <div className='text-rose-700 flex items-center justify-center p-2'>
                {err}
              </div>
            )}

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
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Processing..." : "Register"}    
              </Button>
            </div>
          </form>
      </Form>

      <h1 className=''>You already have an account? <Link className='text-rose-400' href={'/login'}>Log In</Link></h1>
    </div>
  )
}
