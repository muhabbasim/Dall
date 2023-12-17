'use client'
import { Separator } from '@/components/ui/separator'
import { Ban, Camera, Check, ChevronsUpDown, Divide, Loader2, Pencil } from 'lucide-react'
import {motion} from 'framer-motion'
import React, { useContext, useState } from 'react'
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
import api from '@/context/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios'
import Image from 'next/image'



interface userDataProps {
  name: string | undefined;
  staff: number;
  address: string;
  password: string;
  password_confirmation: string;
  departments: number;
  country: number;
  city: number;
}

const formSchema = z.object({
  name: z.string().min(1, 'company_name is required'),
  country: z.number().min(1, 'company_country is required'),
  city: z.number().min(1, 'company_city is required'),
  address: z.string().min(1, 'company_address is required'),
  departments: z.array(z.number()).min(1, 'company_departments is required'),
  staff: z.number().min(1, 'company_staff is required'),
  email: z.string().min(1, {message: "Email is required."}).email('Invalid Email'),
  phone: z.string(),
  company_password: z.string(),
  company_password_confirmation: z.string(),
})


export default function Profile() {

  const { currentUser } = useContext(AuthContext);

  const [ err, setErr] = useState();

  // get country
  const { data: userData, isLoading: userIsLoading, isError } = useQuery({
    queryKey: ['cooperationData'],
    queryFn: async () => 
    await api.get(`/company/show`).then((res) => {
      return res.data?.data as userDataProps;
    })
  })

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


  // currentuser skills array
  const currenUserDepartments = Array.isArray(currentUser?.departments)
    ? currentUser?.departments.map((department) => department.id)
    : []
  ;

  const [ selectedDepartments, setSelectedDepartments ] = useState<number[]>(currenUserDepartments || []); 
  
  const handleDepartmentsOption = (item: number) => {
    setSelectedDepartments(selectedDepartments.includes(item)
    ? selectedDepartments.filter((options) => options !== item)
    : [...selectedDepartments, item])
  }


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser && currentUser?.name || undefined,
      country: currentUser && currentUser?.country || undefined,
      city: currentUser && currentUser?.city || undefined,
      address: currentUser && currentUser?.address || undefined,
      departments: currenUserDepartments || undefined,
      email: currentUser && currentUser?.email || undefined,
      staff: currentUser && currentUser.staff || undefined,
      phone: currentUser && currentUser.phone || undefined,
      company_password: "",
      company_password_confirmation: "",
    },
  })
  const { isSubmitting } = form.formState;


  // user data update function
  const submitForm = async (values: z.infer<typeof formSchema>) => {

    const {departments, company_password, company_password_confirmation, ...otherValues } = values;
    console.log({...otherValues, departments: selectedDepartments})

    try {
      // hanelUpdate(values)
      const res = await api.put(`/company/update`, {
        ...otherValues, 
        departments: selectedDepartments
      });
      console.log(res);
      toast.success('Information updated successfully')

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
        toast.error(err)
      }
      // toast.error('Something went wrong, please try again!')
      console.log(error)
    } 
  } 

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

                <div className='image_container w-[400px] h-full p-8'>
                  <div className='relative flex flex-col md:flex-row gap-5 items-center '>
                  <div className='relative sidebar_img_container w-32 h-32 rounded-full overflow-hidden'>
                    <Image
                      src="/assets/images/indivisual_img.avif" 
                      width={200}
                      height={200}
                      alt="personal image" 
                      className='sidebar_img object-cover'
                    />
                    <div className='absolute z-100 top-0 left-0 shadow-xl bg-background/20 rounded-full w-32 h-32 flex items-center justify-center cursor-pointer transition-all'>
                      <div className='text-white flex flex-col items-center justify-between gap-2'>
                        <Camera className=''/>
                        <h1 className='text-xs text-center'>Click to change the photo</h1>
                      </div>
                    </div>
                  </div>
                      {userIsLoading ? 
                      'Loading...' : (
                      <div className='text-center'>
                        <h2>{currentUser?.name}</h2>
                        <h3 className='text-gray-400 text-sm'>{currentUser?.email}</h3>
                      </div>
                    )}
                  </div>
                </div>
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
                            name="name"
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
                      </div>


                      <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Country</FormLabel>
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
                                              form.setValue("country", country.id)
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
                            name="city"
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
                                      <CommandInput placeholder="Search city..." />
                                      <CommandEmpty>No city found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(cities) &&
                                          cities.map((city) => (
                                          <CommandItem
                                            value={city.name}
                                            key={city.id}
                                            onSelect={() => {
                                              form.setValue("city", city.id)
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


                      <div className='w-full h-[1px] py-10'>
                        <Separator className='w-full h-[1px]'/>
                      </div>


                      <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="address"
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
                        </div>
                      </div>

                      <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="departments"
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
                                            form.setValue("departments", [...selectedDepartments, department.id])
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
                            name="staff"
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

                      <div className='w-full h-[1px] py-10'>
                        <Separator className='w-full h-[1px]'/>
                      </div>

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
    </motion.div>
  )
}



