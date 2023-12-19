'use client'
import { Button } from '@/components/ui/button';
import api from '@/context/apiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Ban, Loader2 } from 'lucide-react';
import React, { FormEvent, useState } from 'react'
import {motion} from 'framer-motion'

import { Separator } from '@/components/ui/separator';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import { UseConfettiStore } from '@/components/hooks/use_confetti_store';
import ExamQuesitons from '../../_components/ExamQuesitons';
import { toast } from 'sonner';

interface ExamProps {
  current_exam: number;
  total_exams: number;
}


export default function IndivisualExams({ params } : { params: { examId: number }}) {
  
  const { examId } = params;
  
  const router = useRouter()
  const confetti = UseConfettiStore();

  // state to track evry question has a selected answer
  const [selectedAll, setSelectedAll] = useState(false);

  // state to track seleted answer to its question
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const handleOptionSelected = (questionId: string, optionId: number) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions, 
      [questionId]: optionId
    }));
  };


  // questions data fetching
  const {data: exam, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['exam_questions'],
    queryFn: async () => 
    await api.get(`/individual/questions/${examId}`).then((res) => {
      return res.data as ExamProps;
    })
  })

  // console.log(exam)

  // answer data manipulation to array
  const arraySelectedOptions = Object.entries(selectedOptions);
  const answers = arraySelectedOptions.map(([question, answer]) => (
    { question: question, answer: answer } 
  ))

  // the last exam catch
  const isLastExam = exam?.current_exam == exam?.total_exams


  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return api.post(`individual/exam/${examId}/answers/store`, { data: answers } );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exam_questions'] });
    }
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      
      const result = await mutation.mutateAsync();
      console.log(result.data);

      setSelectedOptions('')
      setSelectedAll(false)
      window.scrollTo(0, 0);
      toast.success( isLastExam ? " Congratulations you finished the exams" : 'Exam submitted successfully');

      if ( isLastExam ) {
        router.push(`results/${examId}`)
        confetti.onOpen();
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {isSuccess ? (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: .3,
            delay: .1
          }} 
          className='w-full flex gap-8 justify-between '
        >
          <div className='w-full'>
            <div className='min-h-[700px] border rounded-lg bg-white '>
              <div className=' w-full p-5 flex justify-between'>
                <div className=' w-full flex justify-between gap-4'>
                  <h1 className='text-lg text-rose-700'>Exam questions</h1>
                  <h1 className='text-lg text-gray-600'>Steps {exam.current_exam} / {exam.total_exams}</h1>
                </div>
              </div>
              <Separator className='w-full px-10 h-[1px]'/>

              <div className='questions-container p-4 md:p-20'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-10'>

                  {/* exam questions  */}
                  <ExamQuesitons  data={exam} handleOptionSelected={handleOptionSelected} selectedOptions={selectedOptions} setSelectedAll={setSelectedAll}/>
                  
                  <div className='flex justify-end'>
                    <Dialog>
                      <DialogTrigger asChild>
                      <Button 
                        disabled={!selectedAll}
                        type='button'
                        className='w-60'
                      >
                        { isLastExam ? "Finish" : "Next" }
                      </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Note</DialogTitle>
                          <DialogDescription className='text-center py-2'>
                            On submit you can not change! <br />
                            You sure of all the answers?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="">
                          <div onClick={handleSubmit} className='text-white border rounded-md p-2 text-sm w-28 flex items-end justify-center bg-gray-800'>
                            <DialogClose className=''>
                              Submit
                            </DialogClose>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </form>
              </div>
            </div>  
          </div>
        </motion.div>
      ) : isLoading ? (
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
    </>

  )
}
