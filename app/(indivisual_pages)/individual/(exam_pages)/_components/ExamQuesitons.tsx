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

interface OptionsProps {
  id: number;
  option: string;
  question_id: number;
  exam_option_id: number;
  letter: string;
}

export default function ExamQuesitons({ handleOptionSelected, selectedOptions, setSelectedAll, data}) {


  const questions = data.questions
  const subQuestion = questions?.slice(1, 3);

  // validate all questions has a selected answer
  const allQuestionsAnswered = questions?.every((question: QuestionProps) =>
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
      {questions?.map((question: QuestionProps) => {
        return (
          <div key={question.id} className='question'>
            <div className=' Questioin_title flex gap-2 mb-4'>
              <Grip className=' text-cyan-500'/>
              <h1 className='text-sm text-gray-500'>
                Qusetion <span className=''>{question?.id}</span>
              </h1>
            </div>
            <div className='w-full text-sm bg-gray-100 p-3 border rounded-sm'>
              <h1>{question?.question} <span className='text-rose-700'>*</span></h1>
            </div>

            <ul className='options grid grid-cols-1 md:grid-cols-2 gap-6 pt-4'>
              {question?.options.map((option: OptionsProps) => {
                return (
                  <li key={option.id} className='option flex gap-2 items-center cursor-pointer'>
                    <div className='flex gap-2 '>
                      <div>
                        <GripVertical className='text-gray-400'/>
                      </div>
                      <h1 className='text-gray-600'>{option.letter}</h1>
                    </div>
                    <div 
                      onClick={() => handleOptionSelected(question?.id, option.id)}
                      className='w-full flex justify-between gap-2 bg-gray-100/40 text-sm items-center text-gray-500 py-1 pl-5 pr-1 border rounded-sm hover:bg-gray-200 '
                    >
                      <div>
                        <p>
                          {option.option}
                        </p>
                      </div>
                      <div className={cn(`bg-teal-600 flex items-end  p-1 border rounded-sm opacity-0 ${selectedOptions[question?.id] === option.id && 'opacity-100'}`)}>
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
