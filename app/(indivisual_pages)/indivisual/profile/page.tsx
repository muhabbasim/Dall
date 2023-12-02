'use client'
import { Separator } from '@/components/ui/separator'
import { Ban, CalendarIcon, Check, ChevronsUpDown, Loader2, Pencil } from 'lucide-react'

import React, { useEffect, useState } from 'react'
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

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format, isValid } from "date-fns"
import api from '@/context/apiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const


const formSchema = z.object({
  first_name: z.string().min(1, 'Fistname is required'),
  second_name: z.string().min(1, 'Secondname is required'),
  last_name: z.string().min(1, 'Lastname is required'),
  email: z.string().email('Invalid Email'),
  phone: z.string(),
  
  birth_country: z.number().min(1, { message: "pirth day is required."}),
  birth_city: z.number().min(1, { message: "pirth city is required."}),
  birth_date: z.date({required_error: "A date of birth is required."}),
  residence_country: z.number().min(1, { message: "residence country is required"}),
  residence_city: z.number().min(1, { message: "residence city is required"}),
  genders: z.number({required_error: "Please select a gender."}),
  
  education_institute: z.number({required_error: "Please select education institution."}),
  nationality: z.number({required_error: "Please select a nationality."}),
  education_level: z.number({required_error: "Please select education level."}),
  occupation: z.number({required_error: "Please select an occupation."}),
  experience_years: z.number({required_error: "Please select years of experience."}),
  major: z.number().min(1, { message: "please select major"}),
  skills: z.number().min(1, 'Password must be at least 8 characters'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string().min(8, 'Password must be the same as the password'),
})

interface userDataProps {
  first_name: string;
  second_name: string;
  last_name: string;
  email: string;
  phone: string;
  
  birth_country: Number;
  birth_city: Number;
  birth_date: Date,
  residence_country: Number;
  residence_city: Number;
  genders: Number;
  
  nationality: Number;
  education_institute: Number;
  education_level: Number;
  major: Number;
  experience_years: Number;
  occupation: Number;
  skills: Number;

  password: string;
  password_confirmation: string;
}

import { 
  useCities, 
  useCountries, 
  useEducationLevel, 
  useUserData, 
  useEducationInstitutions,
  useSpecialization,
  useOccupations,
  useExperienceYears,
  useSkills,
  useMajors,
  useHobbies,
  useDiplomas,
  useGenders
} from '@/components/data/dataFether';


export default function page() {

  const queryClient = useQueryClient()
  const [ countryId, setCountryId ] = useState('')
  
  // data fetchers 
  const {data: userData, isLoading: userIsLoading, isError } = useUserData();
  const { data: countries } = useCountries();
  const { data: cities } = useCities(1);
  const { data: genders } = useGenders();
  const { data: educationLevel } = useEducationLevel();
  const { data: educationInstitutions } = useEducationInstitutions();
  const { data: occupations } = useOccupations();
  const { data: experienceYears } = useExperienceYears();
  const { data: skills } = useSkills();
  const { data: majors } = useMajors();
  const { data: diplomas } = useDiplomas();
  const { data: specializations } = useSpecialization();
  const { data: hobbies } = useHobbies();

  // console.log(userData?.first_name)
  const userName = 'user'


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: userData && userData.first_name ,
      second_name: "",
      last_name: "",
      email: "",
      phone: "",
      
      birth_country: 0,
      birth_city: 0,
      // birth_date: ,
      residence_country: 0,
      residence_city: 0,
      genders: 0,
      
      nationality: 0,
      education_institute: 0,
      education_level: 0,
      major: 0,
      experience_years: 0,

      password: "",
      password_confirmation: "",
    },
  })

  const { isSubmitting } = form.formState;



  const handleChange = (value: number) => {
    console.log(value)
  }
  
  const { mutate: hanelUpdate, isPending } = useMutation<void, Error, userDataProps>({
    mutationFn: async (values) => {
      return await api.put(`/individual/information/update`, values)
    },
    onSuccess: () => {
      toast.success('Data updated successfully')
      queryClient.invalidateQueries({ queryKey: ['userData'] })
    },
    onError: () => {
      toast.error('Something went wrong, please try again!')

    }
  })

  const submitForm = async (values: z.infer<typeof formSchema>) => {

    const { birth_date } = values
    const formated_birth_date = format(birth_date, 'yyyy-mm-dd').replace(/"/g, '');

    console.log({birth_date: formated_birth_date })
    // console.log(values)

    try {
      // hanelUpdate(values)
      api.put(`/individual/information/update`, {...values, birth_date: formated_birth_date})
      
    } catch (error) {
      toast.error('Something went wrong, please try again!')
      console.log(error)
    }
  } 

  return (
    <div className='w-full flex gap-8 justify-between'>
      <div className='w-full'>

        <div className='min-h-[700px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Personal information</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          {userData ? (
            <div className='personal_info'>
              <div className='w-full flex flex-col items-center'>

                <div className='image_container w-[400px] h-full p-8'>
                  <div className='relative flex gap-5 items-center '>
                    <div className='sidebar_img_container w-28 h-28 rounded-full overflow-hidden'>
                      <img 
                        src="/assets/images/indivisual_img.avif" 
                        alt="" 
                        className='sidebar_img object-cover'
                      />
                    </div>
                    <div className='absolute top-20 left-20 shadow-xl bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:text-sky-600 transition-all'>
                      <Pencil className='w-5 h-5'/>
                    </div>
                      {userIsLoading ? 
                      'Loading...' : (
                      <div className='text-center'>
                        <h2>{userData?.first_name}, <span className='font-bold'>{userData?.last_name}</span></h2>
                        <h3 className='text-gray-400 text-sm'>{userData?.email}</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='info_form px-20'>
                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(submitForm)}
                      className="space-y-2 mt-5"
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
                                    placeholder="firstname"
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
                            name="second_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Middlename</FormLabel>
                                <FormControl>
                                  <Input
                                    // disabled={isSubmitting}
                                    placeholder="second name'"
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
                                    placeholder="lastname'"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage/> 
                              </FormItem>
                            )}
                          />
                        </div>

                      </div>
                        
                      <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                  <Input
                                  type='email'
                                  // disabled={isSubmitting}
                                  placeholder="e.g. 'Emanuell@gmail.com'"
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
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input
                                    type='number'
                                    // disabled={isSubmitting}
                                    placeholder="e.g +966 483 3333"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/> 
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="birth_country"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Birth country</FormLabel>
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
                                      <CommandEmpty>No country found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(countries) &&
                                          countries.map((country) => (
                                          <CommandItem
                                            value={country.english_name}
                                            key={country.id}
                                            onSelect={() => {
                                              form.setValue("birth_country", country.id)
                                              setCountryId(country.id)
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
                            name="birth_city"
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
                                            cities.find(city => city.id === field.value)?.english_name
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
                                            value={city.english_name}
                                            key={city.id}
                                            onSelect={() => {
                                              form.setValue("birth_city", city.id)
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
                                            {city.english_name}
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
                          name="birth_date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className='py-1'>Date of birth</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "yyyy-MM-dd")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        </div>
                      </div>

                      <div className='w-full h-[1px] py-10'>
                        <Separator className='w-full h-[1px]'/>
                      </div>

                      <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="residence_country"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Residence country</FormLabel>
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
                                      <CommandEmpty>No country found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(countries) &&
                                        countries.map((country) => (
                                        <CommandItem
                                          value={country.english_name}
                                          key={country.id}
                                          onSelect={() => {
                                            form.setValue("residence_country", country.id)
                                            setCountryId(country.id)
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
                            name="residence_city"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Residence city</FormLabel>
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
                                          cities.find(city => city.id === field.value)?.english_name
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
                                          value={city.english_name}
                                          key={city.id}
                                          onSelect={() => {
                                            form.setValue("residence_city", city.id)
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
                                          {city.english_name}
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
                            name="nationality"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Nationality</FormLabel>
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
                                      <CommandEmpty>No nationality found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(countries) &&
                                        countries.map((country) => (
                                        <CommandItem
                                          value={country.english_name}
                                          key={country.id}
                                          onSelect={() => {
                                            form.setValue("nationality", country.id)
                                            setCountryId(country.id)
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
                            name="genders"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Gender</FormLabel>
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
                                        ? (Array.isArray(genders) ?
                                          genders.find(item => item.id === field.value)?.english_name
                                          : "")
                                        : "Select gender"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search gender..." />
                                      <CommandEmpty>No gender found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(genders) &&
                                        genders.map((item) => (
                                        <CommandItem
                                          value={item.english_name}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue("genders", item.id)
                                            setCountryId(item.id)
                                          }}
                                          // onChange={() => handleChange(country.id)}

                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              item.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {item.english_name}
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
                            name="education_institute"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Education institution</FormLabel>
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
                                        ? (Array.isArray(educationInstitutions) ?
                                          educationInstitutions.find(institution => institution.id === field.value)?.english_name
                                          : "")
                                        : "Select institution"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search education_institute..." />
                                      <CommandEmpty>No education institution found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(educationInstitutions) &&
                                        educationInstitutions.map((institution) => (
                                        <CommandItem
                                          value={institution.english_name}
                                          key={institution.id}
                                          onSelect={() => {
                                            form.setValue("education_institute", institution.id)
                                            setCountryId(institution.id)
                                          }}
                                          // onChange={() => handleChange(country.id)}

                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              institution.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {institution.english_name}
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
                            name="education_level"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Education level</FormLabel>
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
                                        ? (Array.isArray(educationLevel) ?
                                          educationLevel.find(item => item.id === field.value)?.english_name
                                          : "")
                                        : "Select level..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search education level..." />
                                      <CommandEmpty>No education level found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(educationLevel) &&
                                        educationLevel.map((item) => (
                                        <CommandItem
                                          value={item.english_name}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue("education_level", item.id)
                                            setCountryId(item.id)
                                          }}
                                          // onChange={() => handleChange(country.id)}

                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              item.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {item.english_name}
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
                            name="major"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Major</FormLabel>
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
                                        ? (Array.isArray(majors) ?
                                          majors.find(item => item.id === field.value)?.english_name
                                          : "")
                                        : "Select major"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search major..." />
                                      <CommandEmpty>No major found.</CommandEmpty>
                                      <CommandGroup>
                                        { Array.isArray(majors) &&
                                          majors.map((item) => (
                                          <CommandItem
                                            value={item.english_name}
                                            key={item.id}
                                            onSelect={() => {
                                              form.setValue("major", item.id)
                                              setCountryId(item.id)
                                            }}
                                            // onChange={() => handleChange(country.id)}

                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                item.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {item.english_name}
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
                            name="experience_years"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Years of experience</FormLabel>
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
                                        ? (Array.isArray(experienceYears) ?
                                          experienceYears.find(item => item.id === field.value)?.english_name
                                          : "")
                                        : "Select experience"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search experience..." />
                                      <CommandEmpty>No experience found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(experienceYears) &&
                                          experienceYears.map((item) => (
                                          <CommandItem
                                            value={item.english_name}
                                            key={item.id}
                                            onSelect={() => {
                                              form.setValue("experience_years", item.id)
                                              setCountryId(item.id)
                                            }}
                                            // onChange={() => handleChange(country.id)}

                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                item.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {item.english_name}
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
                            name="occupation"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Occupation</FormLabel>
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
                                        ? (Array.isArray(occupations) ?
                                          occupations.find(item => item.id === field.value)?.english_name
                                          : "")
                                        : "Select an occupations"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search occupation..." />
                                      <CommandEmpty>No occupation found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(occupations) &&
                                          occupations.map((item) => (
                                          <CommandItem
                                            value={item.english_name}
                                            key={item.id}
                                            onSelect={() => {
                                              form.setValue("occupation", item.id)
                                              setCountryId(item.id)
                                            }}
                                            // onChange={() => handleChange(country.id)}

                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                item.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {item.english_name}
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
                            name="skills"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Skills</FormLabel>
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
                                        ? (Array.isArray(skills) ?
                                          skills.find(item => item.id === field.value)?.english_name
                                          : "")
                                        : "Select skills"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search skills..." />
                                      <CommandEmpty>No skills found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(skills) &&
                                          skills.map((item) => (
                                          <CommandItem
                                            value={item.english_name}
                                            key={item.id}
                                            onSelect={() => {
                                              form.setValue("skills", item.id)
                                              setCountryId(item.id)
                                            }}
                                            // onChange={() => handleChange(country.id)}

                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                item.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {item.english_name}
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

                      <div className='w-full h-[1px] py-10'>
                        <Separator className='w-full h-[1px]'/>
                      </div>

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
                                  placeholder="Enter your password'"
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
                                    placeholder="Confirm Password"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/> 
                              </FormItem>
                            )}
                          />
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
                          {isSubmitting ? "Submitting" : "Save Change"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          ) : userIsLoading ? (
            <div className='min-h-[600px]  w-full flex items-center justify-center'>
              <div className='flex items-center justify-center gap-2'>
                <Loader2 className="mr-2 h-10 w-10 text-cyan-700 animate-spin" />
                <h1>Loading questions...</h1>
              </div>
            </div>
          ) : isError && (
            <div className='min-h-[600px]  w-full flex items-center justify-center'>
              <div className='flex items-center justify-center gap-2'>
                <Ban className="mr-2 h-10 w-10 text-rose-700" />
                <h1>Internet Error...</h1>
              </div>
            </div>
          )}
        </div>  
      </div>
    </div>
  )
}

