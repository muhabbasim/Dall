'use client'
import { Separator } from '@/components/ui/separator'
import { AlertTriangle, Ban, CalendarIcon, Check, ChevronsUpDown, Loader2, Pencil } from 'lucide-react'
import {motion} from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
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
import { useUserData } from '@/components/data/dataFether';
import { AuthContext } from '@/context/authContext'
import { Badge } from '@/components/ui/badge'
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
import { format } from "date-fns"
import api from '@/context/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import ProfileImage from './_components/ProfileImage'
import { ChangePasswordDialog } from './_components/ChangePasswordDialog'
import { AxiosError } from 'axios'

interface userDataProps {
  first_name: string | undefined;
  second_name: string;
  last_name: string;
  name: string;
  email: string;
  phone: number | string;
  image: string;
  
  birth_country: number;
  birth_city: number;
  birth_date: string;
  residence_country: number;
  residence_city: number;
  gender: number;
  nationality: number;
  
  education_institute: number;
  education_level: number;
  major: number;
  experience_years: number;
  occupation: number;
  skills: number;

}

interface FormDataProps {
  countries: [];
  departments: [];
  education_levels: [];
  education_institutes: [];
  specializations: [];
  occupations: [];
  experience_year: [];
  skills: [];
  majors: [];
  hobbies: [];
  jobs: [];
  genders: [];
  diplomas: [];
}

type CountryProps = {
  id: number;
  name: string;
}

type CityProps = {
  id: number;
  name:string;
}

type EducationLevelsProps = {
  id: number;
  name: string;
}

type EducationInstitutesProps = {
  id: number;
  name: string;
}

type OccupationsProps = {
  id: number;
  name: string;
}

type ExperienceYearProps = {
  id: number;
  name: string;
}

type SkillsProps = {
  id: number;
  name: string;
} 

type MajorsProps = {
  id: number;
  name: string;
}

type GendersProps = {
  id: number;
  name: string;
}


const formSchema = z.object({
  first_name: z.string().min(1, 'Fistname is required'),
  second_name: z.string().min(1, 'Secondname is required'),
  last_name: z.string().min(1, 'Lastname is required'),
  email: z.string().email('Invalid Email'),
  phone: z.string().min(10, 'Phone number should be at least 10 digits'),
  
  birth_country: z.number().min(1, { message: "pirth day is required."}),
  birth_city: z.number().min(1, { message: "pirth city is required."}),
  birth_date: z.any({required_error: "A date of birth is required."}),
  residence_country: z.number().min(1, { message: "residence country is required"}),
  residence_city: z.number().min(1, { message: "residence city is required"}),
  gender: z.number({required_error: "Please select a gender."}),
  
  education_institute: z.number({required_error: "Please select education institution."}),
  nationality: z.number({required_error: "Please select a nationality."}),
  education_level: z.number({required_error: "Please select education level."}),
  occupation: z.number({required_error: "Please select an occupation."}),
  experience_years: z.number({required_error: "Please select years of experience."}),
  major: z.number().min(1, { message: "please select major"}),
  skills: z.array(z.number()).min(1, 'Skills is required'),
  // skills: z.number().min(1, 'Skills is required'),

})


export default function Profile() {

  const { currentUser } = useContext(AuthContext);
  const [ err, setErr ] = useState<string>()

  // form data fetching
  const { data: userData, isLoading: userIsLoading, isError  } = useUserData();
  const { data: formData } = useQuery({
    queryKey: ['formData'],
    queryFn: async () => 
    await api.get(`/individual/user-update-data`).then((res) => {
      return res.data as FormDataProps;
    })
  })
  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => 
    await api.get(`/get/country-cities/1`).then((res) => {
      return res.data as userDataProps;
    })
  })


  // currentuser skills array
  const currenUserSkills = Array.isArray(currentUser?.skills)
    ? currentUser?.skills.map((skill) => skill.id)
    : []
  ;

  // date saver
  const [ datePicker, setDatePicker ] = useState<Date | undefined | string>(currentUser?.birth_date);

  // selected skills array function
  const [ selectedSkills, setSelectedSkills ] = useState<number[]>(currenUserSkills||[]); 
  const handleSkillsOption = (item: number) => {

    setSelectedSkills(selectedSkills.includes(item)
    ? selectedSkills.filter((options) => options !== item)
    : [...selectedSkills, item])
  }

  // form data distruction
  const countries: CountryProps[] = formData?.countries || [];
  const education_institutes: EducationInstitutesProps[] = formData?.education_institutes || [];
  const education_levels: EducationLevelsProps[] = formData?.education_levels || [];
  const occupations: OccupationsProps[] = formData?.occupations || [];
  const experience_year: ExperienceYearProps[] = formData?.experience_year || [];
  const skills: SkillsProps[] = formData?.skills || [];
  const majors: MajorsProps[] = formData?.majors || [];
  const genders: GendersProps[] = formData?.genders || [];


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: currentUser && currentUser?.first_name || undefined,
      second_name: currentUser && currentUser?.second_name || undefined,
      last_name: currentUser && currentUser?.last_name || undefined,
      email: currentUser && currentUser?.email || undefined,
      phone: currentUser && currentUser?.phone || undefined,
      
      birth_country: currentUser && currentUser?.birth_country.id || undefined,
      birth_city: currentUser && currentUser?.birth_city.id || undefined,
      // birth_date: currentUser && currentUser?.birth_date || undefined,
      residence_country: currentUser && currentUser?.residence_country.id || undefined,
      residence_city: currentUser && currentUser?.residence_city.id || undefined,
      gender: currentUser && currentUser?.gender?.id || undefined,
      
      nationality: currentUser && currentUser?.nationality.id || undefined,
      education_institute: currentUser && currentUser?.education_institute.id || undefined,
      education_level: currentUser && currentUser?.education_level.id || undefined,
      major: currentUser && currentUser?.major.id || undefined,
      experience_years: currentUser && currentUser?.experience_years.id || undefined,
      occupation: currentUser && currentUser?.occupation.id || undefined,
      skills: currenUserSkills || undefined,
  
    },
  })
  
  const { isSubmitting } = form.formState;

  // user data update function
  const submitForm = async (values: z.infer<typeof formSchema>) => {

    const { birth_date, skills, ...otherValues } = values;
    console.log({otherValues, skills: selectedSkills ,birth_date, datePicker})
    
    try {
      // hanelUpdate(values)
      const res = await api.put(`/individual/information/update`, {
        ...otherValues,
        skills: selectedSkills,
        birth_date: datePicker,
      });
      console.log(res);
      toast.success('Information updated successfully')

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
      }
      toast.error('Something went wrong, please try again!')
      console.log(error)
    } 
  } 

  useEffect(() => {
    setTimeout(() => {
      setErr('')
    }, 4000);
  }, [err]) 

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: .3,
        delay: .1
      }} 
      className='w-full flex gap-8 justify-between'
    >
      <div className='w-full'>

        <div className='min-h-[700px] border rounded-lg bg-white'>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Personal information</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

          {userData ? (
            <div className='personal_info'>
              <div className='w-full flex flex-col items-center'>
                <ProfileImage user={userData}/>
              </div>
              <div className='info_form px-6 md:px-20 flex justify-end'>
                <ChangePasswordDialog/>
              </div>
              <div className='info_form px-6 md:px-20'>
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
                                    placeholder="e.g 054 483 3333"
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
                                          countries.find(country => country.id === field.value)?.name
                                            : "")
                                          : "Select country"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search country..." />
                                      <CommandEmpty>No country found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(countries) &&
                                          countries.map((country) => (
                                          <CommandItem
                                            value={country.name}
                                            key={country.id}
                                            onSelect={() => {
                                              form.setValue("birth_country", country.id)
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
                            name="birth_city"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Birth city</FormLabel>
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
                                          : "Select city"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search city..." />
                                      <CommandEmpty>No city found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(cities) &&
                                          cities.map((city) => (
                                          <CommandItem
                                            value={city.name}
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
                                      {datePicker ? (
                                        <>
                                          {datePicker}
                                        </>
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
                                    onSelect={(date) => {
                                      if (date instanceof Date) {
                                        const formattedDate = format(date, "yyyy-MM-dd");
                                        field.onChange(formattedDate);
                                        setDatePicker(formattedDate);
                                      }
                                    }}
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
                                            form.setValue("residence_country", country.id)
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
                                      <CommandEmpty>No nationality found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(countries) &&
                                        countries.map((country) => (
                                        <CommandItem
                                          value={country.name}
                                          key={country.id}
                                          onSelect={() => {
                                            form.setValue("nationality", country.id)
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
                            name="gender"
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
                                          genders.find(item => item.id === field.value)?.name
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
                                          value={item.name}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue("gender", item.id)
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
                                          {item.name}
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
                                        ? (Array.isArray(education_institutes) ?
                                          education_institutes.find(institution => institution.id === field.value)?.name
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
                                      { Array.isArray(education_institutes) &&
                                        education_institutes.map((institution) => (
                                        <CommandItem
                                          value={institution.name}
                                          key={institution.id}
                                          onSelect={() => {
                                            form.setValue("education_institute", institution.id)
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
                                          {institution.name}
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
                                        ? (Array.isArray(education_levels) ?
                                          education_levels.find(item => item.id === field.value)?.name
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
                                      { Array.isArray(education_levels) &&
                                        education_levels.map((item) => (
                                        <CommandItem
                                          value={item.name}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue("education_level", item.id)
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
                                          {item.name}
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
                                          majors.find(item => item.id === field.value)?.name
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
                                            value={item.name}
                                            key={item.id}
                                            onSelect={() => {
                                              form.setValue("major", item.id)
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
                                            {item.name}
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
                                        ? (Array.isArray(experience_year) ?
                                          experience_year.find(item => item.id === field.value)?.name
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
                                      { Array.isArray(experience_year) &&
                                          experience_year.map((item) => (
                                          <CommandItem
                                            value={item.name}
                                            key={item.id}
                                            onSelect={() => {
                                              form.setValue("experience_years", item.id)
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
                                            {item.name}
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
                                          occupations.find(item => item.id === field.value)?.name
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
                                            value={item.name}
                                            key={item.id}
                                            onSelect={() => {
                                              form.setValue("occupation", item.id)
                                            }}

                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                item.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {item.name}
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
                                        <div className='flex h-full w-full gap-2 items-center'>
                                          { skills ?
                                            Array.isArray(skills) &&
                                            skills.map((skill) => selectedSkills.includes(skill.id) && (
                                              <Badge 
                                                key={skill.id}
                                                variant="secondary"
                                                className="mr-1 mb-1"
                                              >
                                                {skill.name}
                                              </Badge>
                                            ) ) 
                                          
                                          : 'Selected skills'}
                                        </div>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search Skills..." />
                                      <CommandEmpty>No skill found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(skills) &&
                                        skills.map((skill) => (
                                        <CommandItem
                                          value={skill.name}
                                          key={skill.id}
                                          onSelect={() => {
                                            handleSkillsOption(skill.id);
                                            form.setValue("skills", [...selectedSkills, skill.id])
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                                selectedSkills.includes(skill.id) ?
                                                "opacity-100" : "opacity-0")
                                              }
                                            />
                                          {skill.name}
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

                      {err && (
                        <div className='w-full text-black bg-yellow-300 flex gap-3 items-center justify-center my-6 py-2 '>
                          <div>
                            <AlertTriangle className='text-rose-700'/> 
                          </div> 
                          <h1 >{err}</h1>
                        </div>
                      )}

                      <div className="flex gap-x-2 items-end justify-end">

                        <Button
                          className=' w-40 my-6'
                          variant={'login'}
                          type="submit"
                          onClick={() => submitForm}
                          disabled={isSubmitting}
                        >
                          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isSubmitting ? "Processing.." : "Save Change"}
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
    </motion.div>
  )
}
