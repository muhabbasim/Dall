'use client'
import { Button } from '@/components/ui/button';
import api from '@/context/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { Ban, Check, Grip, GripVertical, Loader2 } from 'lucide-react';
import React, { FormEvent, useState } from 'react'


import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';




const questions = [
  { 
    id: '1',
    questionText: 'What is the capital of France?',
    answerOptions: [
      { id: 1, answerText: 'New York', isCorrect: false },
      { id: 2, answerText: 'London', isCorrect: false },
      { id: 3, answerText: 'Paris', isCorrect: true },
      { id: 4, answerText: 'Dublin', isCorrect: false },
    ],
  },
  {
    id: '2',
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { id: 1, answerText: 'Jeff Bezos', isCorrect: false },
      { id: 2, answerText: 'Elon Musk', isCorrect: true },
      { id: 3, answerText: 'Bill Gates', isCorrect: false },
      { id: 4, answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    id: '3',
    questionText: 'The iPhone was created by which company?',
    answerOptions: [
      { id: 1, answerText: 'Apple', isCorrect: true },
      { id: 2, answerText: 'Intel', isCorrect: false },
      { id: 3, answerText: 'Amazon', isCorrect: false },
      { id: 4, answerText: 'Microsoft', isCorrect: false },
    ],
  },
  {
    id: '4',
    questionText: 'How many Harry Potter books are there?',
    answerOptions: [
      { id: 1, answerText: '1', isCorrect: false },
      { id: 2, answerText: '4', isCorrect: false },
      { id: 3, answerText: '6', isCorrect: false },
      { id: 4, answerText: '7', isCorrect: true },
    ],
  },
];

interface QuestionProps {
  id: string;
  arabic_name: string;
  arabic_question: string;
  english_question: string;
  options: []
} 

interface OptionsProps {
  id: number;
  arabic_option: string;
  english_option: string;
  question_id: number;
  exam_option_id: number;
}

export default function IndivisualExams() {


  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  const handleOptionSelected = (questionId: string, optionId: number) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions, 
      [questionId]: optionId,
    }));
  };

  const { data: ExamQuestions, isLoading, isError } = useQuery({
    queryKey: ['exam_questions'],
    queryFn: async () => 
    await api.get(`/individual/questions`).then((res) => {
      return res.data;
    })
  })

  // console.log(ExamQuestions)

  // const individualExams = ExamQuestions && ExamQuestions[1] && ExamQuestions[1]
  const individualExams = ExamQuestions?.find((item) => item.id === 2)
  // console.log(individualExams)

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    console.log(selectedOptions)
  }
 
  return (
    <>
      {individualExams ? (
        <div className='w-full flex gap-8 justify-between '>
          <div className='w-full'>
            <div className='min-h-[700px] border rounded-lg bg-white '>
              <div className=' w-full p-5 flex justify-between'>
                <div>
                  <h1 className='text-lg text-gray-600'>Question 1</h1>
                </div>
                <div className='flex gap-2'>
                  <h1 className=' font-bold text-slate-600'>Time left:</h1>
                  <div>
                    <h1 className='text-rose-700'>20:00</h1>
                  </div>
                </div>
              </div>
              <Separator className='w-full px-10 h-[1px]'/>

              <div className='questions-container p-20'>
                <form className='flex flex-col gap-10'>

                  {individualExams?.questions.map((question: QuestionProps) => {
                    return (
                      <div key={question.id} className='question'>
                        <div className=' Questioin_title flex gap-2 mb-4'>
                          <Grip className='text-gray-400'/>
                          <h1 className='text-sm'>
                            Qusetion <span className='text-gray-500'>{question.id}</span>
                          </h1>
                        </div>
                        <div className='w-full text-sm bg-gray-100 p-3 border rounded-sm'>
                          <h1>{question.english_question}</h1>
                        </div>

                        <ul className='options grid grid-cols-1 md:grid-cols-2 gap-2 pt-4'>
                          {question.options.map((option: OptionsProps) => {
                            return (
                              <li key={option.id} className='option flex gap-2 items-center'>
                                <div className='flex gap-2 '>
                                  <div>
                                    <GripVertical className='text-gray-400'/>
                                  </div>
                                  <h1 className='text-gray-600'>A</h1>
                                </div>
                                <div 
                                  onClick={() => handleOptionSelected(question.id, option.id)}
                                  className='w-full flex justify-between gap-2 bg-gray-100/20 text-sm items-center text-gray-500 py-1 pl-5 pr-1 border rounded-sm hover:bg-gray-300 '
                                >
                                  <div>
                                    <p>
                                      {option.english_option}
                                    </p>
                                  </div>
                                  <div className={cn(`bg-teal-600 flex items-end  p-1 border rounded-sm opacity-0 ${ selectedOptions[question.id] === option.id && 'opacity-100'}`)}>
                                    <Check className='text-white'/>
                                  </div>
                                </div>
                              </li>
                            )
                          })}
                        </ul>

                        <Separator className='w-full px-10 h-[1px] mt-10'/>
                      </div>
                    )
                  })}
                    
                  <Button onClick={(e) => handleNext(e)}>Next</Button>
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
