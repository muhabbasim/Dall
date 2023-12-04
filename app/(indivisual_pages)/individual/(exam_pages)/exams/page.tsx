'use client'
import { Button } from '@/components/ui/button';
import api from '@/context/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { Ban, Loader2 } from 'lucide-react';
import React, { FormEvent, useState } from 'react'


import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useMultistepForm } from '@/components/hooks/useMultistepForm';
import QuesitonsPartOne from '../_components/QuesitonsPartOne';
import QuesitonsPartTow from '../_components/QuesitonsPartTwo';
import QuesitonsPartThree from '../_components/QuesitonsPartThree';
import QuesitonsPartFour from '../_components/QuesitonsPartFour';

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

export default function IndivisualExams() {
  const router = useRouter()

  // state to track evry question has a selected answer
  const [selectedAll, setSelectedAll] = useState(false);

  // state to track seleted answer to its question
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const handleOptionSelected = (questionId: string, optionId: number) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions, 
      [questionId]: optionId,
    }));
  };


  const { steps, step, currentStepIndex, isLastStep, next } = useMultistepForm([
    <QuesitonsPartOne handleOptionSelected={handleOptionSelected} selectedOptions={selectedOptions} setSelectedAll={setSelectedAll}/>,
    <QuesitonsPartTow handleOptionSelected={handleOptionSelected} selectedOptions={selectedOptions} setSelectedAll={setSelectedAll}/>,
    <QuesitonsPartThree handleOptionSelected={handleOptionSelected} selectedOptions={selectedOptions} setSelectedAll={setSelectedAll}/>,
    <QuesitonsPartFour handleOptionSelected={handleOptionSelected} selectedOptions={selectedOptions} setSelectedAll={setSelectedAll}/>
  ]);



  // questions data fetching
  const { data: ExamQuestions, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['exam_questions'],
    queryFn: async () => 
    await api.get(`/individual/questions`).then((res) => {
      return res.data;
    })
  })


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      router.push('/individual/results')
    }
    next()
    // console.log(selectedOptions)
    setSelectedOptions('')
    setSelectedAll(false)
    window.scrollTo(0, 0);
  }


  return (
    <>
      {isSuccess ? (
        <div className='w-full flex gap-8 justify-between '>
          <div className='w-full'>
            <div className='min-h-[700px] border rounded-lg bg-white '>
              <div className=' w-full p-5 flex justify-between'>
                <div>
                  <h1 className='text-lg text-rose-700'>Exam Question</h1>
                  <h1 className='text-lg text-gray-600'>Step {currentStepIndex + 1} / {steps.length}</h1>
                </div>
                <div className='flex gap-2'>
                  <h1 className=' font-bold text-slate-600'>Estimated time left:</h1>
                  <div>
                    <h1 className='text-rose-700'>20:00</h1>
                  </div>
                </div>
              </div>
              <Separator className='w-full px-10 h-[1px]'/>

              <div className='questions-container p-20'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                  {step}
                  <div className='flex justify-end'>
                    <Dialog>
                      <DialogTrigger asChild>
                      <Button disabled={!selectedAll} className='w-60' type='button'>{ isLastStep ? "Finish" : "Next" }</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Note</DialogTitle>
                          <DialogDescription className='text-center'>
                            On submit you can not change! <br />
                            You sure of all the answers?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                          <div onClick={handleSubmit} className='text-white border rounded-md p-2 w-28 flex items-end justify-center bg-black'>
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
        </div>
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
