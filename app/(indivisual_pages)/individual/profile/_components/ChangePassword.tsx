import React, { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import api from '@/context/apiRequest';
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { AxiosError } from 'axios'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 10 characters'),
  new_password: z.string().min(1, 'New Password is required').min(8, 'Password must be at least 10 characters'),
  new_password_confirmation: z.string().min(1, 'Password confirmation is required').min(8, 'Password must be at least 10 characters'),
})

export default function ChangePassword() {

  const [ err, setErr ] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  })

  const { isSubmitting } = form.formState;

  const submitPasswordChange = async (values: z.infer<typeof formSchema>) => {
    const { new_password_confirmation, new_password, } = values;
    console.log(values)
    try {
      
      if (new_password !== new_password_confirmation ) {
        toast.error('Password does not match password comfirmation')
        return
      }
      const res = await api.post(`/change-password`, values );
      console.log(res);
      toast.success('Password changed successfully')

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
      }
      console.log(error)
    } 
  } 

  useEffect(() => {
    setTimeout(() => {
      setErr('')
    }, 5000);
  }, [err])

  return (
    <div className='info_form px-6'>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitPasswordChange)}
            className="space-y-2 mt-5"
          >
            <div className='flex flex-col md:flex-row flex-wrap w-full gap-5'>
              
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                        type='password'
                        autoComplete='no'
                        placeholder="Enter your password'"
                        {...field}
                        />
                      </FormControl>
                      <FormMessage/> 
                    </FormItem>
                  )}
                />
              </div>

              <div className='w-full'>
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm Password"
                          type='password'
                          {...field}
                          />
                      </FormControl>
                      <FormMessage/> 
                    </FormItem>
                  )}
                />
              </div>

              <div className='w-full'>
                <FormField
                  control={form.control}
                  name="new_password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder="Confirm Password"
                          {...field}
                          />
                      </FormControl>
                      <FormMessage/> 
                    </FormItem>
                  )}
                />
              </div>

             {err && <div className='flex items-center justify-center text-rose-700 p-4'>
               {err}
              </div>}

              <Button
                variant={'default'}
                className='w-full'
                onClick={() => submitPasswordChange}
                // disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Processing..." : "Save Change"}
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  )
}
