import { Separator } from '@/components/ui/separator';
import api from '@/context/apiRequest';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Check, Grip, GripVertical } from 'lucide-react';
import React, { FormEvent, useEffect, useState } from 'react'
import { Button } from 'react-day-picker';

interface QuestionProps {
  id: string;
  arabic_name: string;
  question: string;
  options: []
} 

interface OptionsProps {
  id: number;
  option: string;
  question_id: number;
  exam_option_id: number;
}

interface OptionsArrayProps {
  QuestionProps: []
}

interface OptionsProps {
  id: number;
  option: string;
  question_id: number;
  exam_option_id: number;
}

export default function QuesitonsPartThree({ handleOptionSelected, selectedOptions, setSelectedAll }) {


  const { data: ExamQuestions } = useQuery({
    queryKey: ['exam_questions'],
    queryFn: async () => 
    await api.get(`/individual/questions`).then((res) => {
      return res.data;
    })
  })

  const individualExams = ExamQuestions?.find((item) => item.id === 2).questions
  const chapter3 = individualExams?.slice(24, 36);
  
    // validate all questions has a selected answer
    const allQuestionsAnswered = chapter3.every((question) =>
    selectedOptions.hasOwnProperty(question.id)
  );

  useEffect(() => {
    // update selectedAll state
    if (allQuestionsAnswered) {
      setSelectedAll(true);
    }
    
  },[selectedOptions])

  return (
    <div>
      <h1 className='text-right  text-teal-800 text-lg'>Quesitons Part Three</h1>
      {chapter3.map((question: QuestionProps) => {
        return (
          <div key={question.id} className='question'>
            <div className=' Questioin_title flex gap-2 mb-4'>
              <Grip className='text-gray-400'/>
              <h1 className='text-sm'>
                Qusetion <span className='text-gray-500'>{question.id}</span>
              </h1>
            </div>
            <div className='w-full text-sm bg-gray-100 p-3 border rounded-sm'>
              <h1>{question.question} <span className='text-rose-700'>*</span></h1>
            </div>

            <ul className='options grid grid-cols-1 md:grid-cols-2 gap-2 pt-4'>
              {question.options.map((option: OptionsProps) => {
                return (
                  <li key={option.id} className='option flex gap-2 items-center cursor-pointer'>
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
                          {option.option}
                        </p>
                      </div>
                      <div className={cn(`bg-teal-600 flex items-end  p-1 border rounded-sm opacity-0 ${selectedOptions[question.id] === option.id && 'opacity-100'}`)}>
                        <Check className='text-white'/>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <Separator className='w-full px-10 h-[1px] my-10'/>
          </div>
        )
      })}
    </div>
  )
}
