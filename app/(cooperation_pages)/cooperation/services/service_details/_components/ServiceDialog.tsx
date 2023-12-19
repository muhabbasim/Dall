import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/context/apiRequest';



export default function ServiceDialog({ verification, id}) {
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (userId) => {
      return api.post(`/company/individuals/${userId}/update`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services_details'] });
    }
  });

  const handleUserVerification = async (userId: number) => {
    try {
      const result = await mutation.mutateAsync(id);
      console.log(result.data);
      toast.success('User Verified');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="pb-2">User confirmation</DialogTitle>
      <DialogDescription className="flex items-center gap-4">
        {verification ? (
          <> 
            <Check className="w-4 h-4 text-teal-700"/>
            <span className="text-teal-700">This user is already verified</span>
          </>
        ) : (
          <span className="">
            Confirming this user will grant him a seat for the dall exams
            Are you sure you want to confirm this user?
          </span>
        )}
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-end justify-end ">
      {verification ? (
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      ) : (
        <DialogFooter className="sm:justify-start w-full">
          <DialogClose asChild>
            <Button onClick={() => handleUserVerification(id)} className="w-full mt-6" type="button" >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      )}
    </div>
  </DialogContent>
  )
}
