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
import { toast } from 'sonner';
import { AxiosError } from 'axios'
import { Calendar } from '@/components/ui/calendar';


const formSchema = z.object({
  service_seats: z.string().min(1, 'service seats is required'),
  service_link_start_date: z.any({required_error: "Start date is required."}),
  service_link_expiration_date: z.any({required_error: "Expiration date is required."}),
})


export default function ReconstructionService({ params }: { params: { serviceId: number; }}) {

  const { serviceId } = params;

  const [ err, setErr] = useState();
  const [ startDatePicker, setStartDatePicker ] = useState<Date | undefined | string>();
  const [ expirationDatePicker, setExpirationDatePicker ] = useState<Date | undefined | string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_seats: '',
      service_link_start_date: '',
      service_link_expiration_date: '',
    },
  })

  const { isSubmitting } = form.formState;

  // form submit function
  const submitForm = async (values: z.infer<typeof formSchema>) => {

    console.log({service_name: 'Organization reconstruction Service', service : serviceId, values})


    try {
      const res = await api.post(`/company/services/store`, {
        service: serviceId, 
        values
      });

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
      <div className='w-full '>

        <div className=' w-full border rounded-lg bg-white '>
          <div className=' w-full text-center p-5'>
            <h1 className=' font-bold text-slate-600'>Organization Reconstructuring Service</h1>
          </div>
          <Separator className='w-full px-10 h-[1px]'/>

            <div className='personal_info p-20'>

              <div className='info_form '>
                <div className=' w-full'>
                  <h1 className=' font-bold text-slate-600'>Service registeration form</h1>
                  <h1 className='text-sm text-rose-800'>All fields are required *</h1>
                </div>
               {/* <Separator className='w-[30%] px-10 h-[1px]'/> */}

                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(submitForm)}
                      className="space-y-2 mt-10"
                    >
                      
                      <div className='flex flex-col md:flex-row flex-wrap gap-5 w-full'>
                        <div className='w-full flex-1'>
                          <FormField
                            control={form.control}
                            name="service_seats"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of seats</FormLabel>
                                <FormControl>
                                  <Input
                                    // disabled={isSubmitting}
                                    type='number'
                                    placeholder="number of seats"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage/> 
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className='flex items-center gap-4'>

                        <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                          <div className='w-full flex-1'>
                            <FormField
                              control={form.control}
                              name="service_link_start_date"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel className='py-1'>Start Date</FormLabel>
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
                                          {startDatePicker ? (
                                            <>
                                              {startDatePicker}
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
                                            setStartDatePicker(formattedDate);
                                          }
                                        }}
                                        // disabled={(date) =>
                                        //   date > new Date() || date < new Date("1900-01-01")
                                        // }
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

                        <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
                          <div className='w-full flex-1'>
                            <FormField
                              control={form.control}
                              name="service_link_expiration_date"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel className='py-1'>Expiration date</FormLabel>
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
                                          {expirationDatePicker ? (
                                            <>
                                              {expirationDatePicker}
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
                                            setExpirationDatePicker(formattedDate);
                                          }
                                        }}
                                        // disabled={(date) =>
                                        //   date > new Date() || date < new Date("1900-01-01")
                                        // }
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
                      </div>

                      <div className="flex gap-x-2 items-end justify-end">
                        <Button
                          className=' w-32 my-6'
                          variant={'submit'}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isSubmitting ? "Submitting" : "Subscribe"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                  <div className='w-full h-[1px] py-10'>
                    <Separator className='w-full h-[1px]'/>
                  </div>
                </div>
              </div>
            </div>
           
        </div>  
      </div>
    </motion.div>
  )
}
