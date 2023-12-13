'use client'
import { Separator } from '@/components/ui/separator'
import { Ban, CalendarIcon, Check, ChevronsUpDown, Divide, Loader2, Pencil } from 'lucide-react'
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
import { format, isValid } from "date-fns"
import api from '@/context/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios'
import { Calendar } from '@/components/ui/calendar';


const formSchema = z.object({
  create_major_id: z.number().min(1, 'Major is required'),
  create_city_id: z.number().min(1, 'City is required'),
  create_experience_year_id: z.number().min(1, 'Experience is required'),
  create_education_id: z.number().min(1, 'Education level is required'),
})


export default function page({ params }: { params: { serviceId: number; }}) {

  const { serviceId } = params;

  const [ err, setErr] = useState();
  const [ datePicker, setDatePicker ] = useState<Date | undefined | string>();

  const { data: majors } = useQuery({
    queryKey: ['majors'],
    queryFn: async () => 
    await api.get(`/get/majors`).then((res) => {
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

  // get experience
  const { data: experience_year } = useQuery({
    queryKey: ['experience_year'],
    queryFn: async () => 
    await api.get(`/get/experience_year`).then((res) => {
      return res.data;
    })
  })

  // get education_level
  const { data: education_levels } = useQuery({
    queryKey: ['education_levels'],
    queryFn: async () => 
    await api.get(`/get/education_levels`).then((res) => {
      return res.data;
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      create_major_id: undefined,
      create_city_id: undefined,
      create_experience_year_id: undefined,
      create_education_id: undefined,
    },
  })

  const { isSubmitting } = form.formState;

  // form submit function
  const submitForm = async (values: z.infer<typeof formSchema>) => {

    console.log(values);

    try {
      const res = await api.put(`/company/services/store`, values);

      console.log(res);
      toast.success('Subscribed successfully')

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
            <h1 className=' font-bold text-slate-600'>Employee Search Service</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

            <div className='personal_info p-20'>
              <div className=' w-full'>
                <h1 className=' font-bold text-slate-600'>Service registeration form</h1>
                <h1 className='text-sm text-rose-800'>All fields are required *</h1>
              </div>

              <div className='info_form '>
                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(submitForm)}
                      className="space-y-2 mt-10"
                    >
                      
                      <div className='flex gap-4'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="create_city_id"
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
                                              form.setValue("create_city_id", city.id)
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

                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="create_major_id"
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
                                              form.setValue("create_major_id", item.id)
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

                      <div className='flex gap-4'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="create_experience_year_id"
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
                                          experience_year.find(item => item.id === field.value)?.english_name
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
                                            value={item.english_name}
                                            key={item.id}
                                            onSelect={() => {
                                              form.setValue("create_experience_year_id", item.id)
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
                            name="create_education_id"
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
                                          education_levels.find(item => item.id === field.value)?.english_name
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
                                          value={item.english_name}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue("create_education_id", item.id)
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

                      <div className="flex gap-x-2 items-end justify-end">
                        <Button
                          className=' w-32 my-6'
                          variant={'login'}
                          type="submit"
                          onClick={() => submitForm}
                          disabled={isSubmitting}
                        >
                          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isSubmitting ? "Submitting" : "Subscribe"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
           
        </div>  
      </div>
    </motion.div>
  )
}
