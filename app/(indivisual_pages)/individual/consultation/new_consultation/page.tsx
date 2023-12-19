'use client'
import { Separator } from '@/components/ui/separator'
import { Check, ChevronsUpDown, Loader2} from 'lucide-react'
import {motion} from 'framer-motion'
import React, {useState } from 'react'
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from '@/lib/utils';
import api from '@/context/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
  create_individual_consultations_consultation_type_id: z.number().min(1, 'Consultation type is required'),
  create_individual_consultations_week_day_id: z.number({required_error: "Consultation date is required."}),
  create_individual_consultations_consultation_time_id: z.number({required_error: "Consultation time is required."}),
})

export default function ComparisionService({ params }: { params: { serviceId: number; }}) {

  const { serviceId } = params;
  const [ err, setErr] = useState();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      create_individual_consultations_consultation_type_id: undefined,
      create_individual_consultations_week_day_id: undefined,
      create_individual_consultations_consultation_time_id: undefined,
    },
  })

  const { data: consultationType } = useQuery({
    queryKey: ['get/consultation-type'],
    queryFn: async () => 
      await api.get(`get/consultation-type`).then((res) => {
      return res.data;
    })
  })
  const { data: consultationDays } = useQuery({
    queryKey: ['consultation_days'],
    queryFn: async () => 
      await api.get(`get/week-daya`).then((res) => {
      return res.data;
    })
  })
  const { data: consoltation_time } = useQuery({
    queryKey: ['consultation_time'],
    queryFn: async () => 
      await api.get(`/individual/consultations/get-consultation-time/1`).then((res) => {
      return res.data?.data;
    })
  })

  const { isSubmitting } = form.formState;

  // form submit function
  const submitForm = async (values: z.infer<typeof formSchema>) => {

    console.log(values)

    try {
      const res = await api.post(`/individual/consultations/store`, values );
      console.log(res);
      toast.success('Consultation booked successfully')
      router.push('/individual/consultation')
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
      }
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
            <h1 className=' font-bold text-slate-600'>New consultation</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

            <div className='personal_info p-20'>
              <div className=' w-full'>
                <h1 className=' font-bold text-slate-600'>Aquire new consultation</h1>
                <h1 className='text-sm text-rose-800'>All fields are required *</h1>
              </div>

              <div className='info_form '>
                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(submitForm)}
                      className="space-y-2 mt-10"
                    >
                      
                      <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="create_individual_consultations_consultation_type_id"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Consultation type</FormLabel>
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
                                        ? (Array.isArray(consultationType) ?
                                          consultationType.find(item => item.id === field.value)?.name
                                          : "")
                                        : "Select consultation type"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search for consultations..." />
                                      <CommandEmpty>No consultations found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(consultationType) &&
                                        consultationType.map((item) => (
                                        <CommandItem
                                          value={item.name}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue("create_individual_consultations_consultation_type_id", item.id)
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

                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="create_individual_consultations_week_day_id"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Consultation day</FormLabel>
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
                                        ? (Array.isArray(consultationDays) ?
                                          consultationDays.find(item => item.id === field.value)?.name
                                          : "")
                                        : "Select day"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search days..." />
                                      <CommandEmpty>No days found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(consultationDays) &&
                                        consultationDays.map((item) => (
                                        <CommandItem
                                          value={item.name}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue("create_individual_consultations_week_day_id", item.id)
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
                            name="create_individual_consultations_consultation_time_id"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className='py-1'>Consultation time</FormLabel>
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
                                        ? (Array.isArray(consoltation_time) ?
                                          consoltation_time.find(item => item.id === field.value)?.time
                                          : "")
                                        : "Select time"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search consultation time..." />
                                      <CommandEmpty>No item found.</CommandEmpty>
                                      <CommandGroup>
                                      { Array.isArray(consoltation_time) &&
                                        consoltation_time.map((item) => (
                                        <CommandItem
                                          value={item.time}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue("create_individual_consultations_consultation_time_id", item.id)
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
                                          {item.time}
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
                          className=' w-full md:w-40 my-6'
                          variant={'default'}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isSubmitting ? "Processing.." : "Book consultation"}
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
