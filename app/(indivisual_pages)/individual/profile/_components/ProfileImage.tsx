import { Camera, ImageIcon, Loader2, Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import ReactImageUpload from './ReactImageUpload'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/context/apiRequest'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

interface userDataProps {
  first_name: string | undefined;
  second_name: string;
  last_name: string;
  email: string;
  image: string;
  phone: number | string;
  name: string;
}

type userProps = {
  user: userDataProps
}

export default function ProfileImage({ user }: userProps) {

  const [ imageFile, setImageFile ] = useState<any>();
  const [ imageValue, setImageValue ] = useState<any>();
  const [ submitting, setSubmitting ] = useState(false);
  const [ err, setErr ] = useState<string>("afsgsdf")

  // image processing
  const image = imageFile?.file
  const formData = new FormData();
  formData.append('image', image)
  

  // data submitting
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return api.post(`/upload-image` , formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData','cooperationData'] });
    }
  });
  
  // submitting function
  const hanldeSubmitImage = async () => {
    try {
      setSubmitting(true);

      const result = await mutation.mutateAsync();
      console.log(result);
      toast.success('Uploaded image successfully')
      setImageFile(undefined)
      setImageValue(undefined)
      setSubmitting(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
      }
      toast.error('Something went wrong, please try again!')
      console.log(error)
      setSubmitting(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setErr('')
    }, 4000);
  }, [err]) 

  return (
    <div className='w-[400px] flex flex-col justify-center items-center md:flex-row h-full gap-6 p-8'>
      <Dialog>
        <DialogTrigger asChild>
          <div className=' flex flex-col justify-center  gap-5 items-center '>
            <div className='relative sidebar_img_container w-40 h-40 rounded-full overflow-hidden'>
              <Image
                src={user?.image} 
                width={200}
                height={200}
                alt="personal image" 
                className='sidebar_img object-cover'
              />
              <div className='absolute z-100 top-0 left-0 shadow-xl bg-background/20 rounded-full w-40 h-40 flex items-center justify-center cursor-pointer transition-all'>
                <div className='text-white flex flex-col items-center justify-between gap-2'>
                  <Camera className=''/>
                  <h1 className='text-sm text-center'>Click to change the photo</h1>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile picutre</DialogTitle>
            <DialogDescription>
              Make changes to your profile picture here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className=" gap-4 py-4">
            <ReactImageUpload setImageFile={setImageFile} imageFile={imageFile} imageValue={imageValue} setImageValue={setImageValue}/>
          </div>

          {err && (
            <div className='text-rose-700 flex items-center justify-center'>
              {err}
            </div>
          )}

          <DialogFooter className=''>
            <Button 
              onClick={hanldeSubmitImage}
              disabled={submitting}
              type="submit"
              className='flex w-full items-center justify-center'
              >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitting ? "Processing..." : "Save Change"}
              </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className=' flex gap-5 items-center '>
        <div className='text-center md:text-left'>
          <h2>{user?.first_name || user?.name}, <span className='font-bold'>{user?.last_name}</span></h2>
          <h3 className='text-gray-400 text-sm'>{user?.email}</h3>
        </div>
      </div>
    </div>
  )
}
