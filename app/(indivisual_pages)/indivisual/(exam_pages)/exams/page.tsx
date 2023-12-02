'use client'
import api from '@/context/apiRequest';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'

export default function page() {

  const { data: ExamQuestions } = useQuery({
    queryKey: ['exam_questions'],
    queryFn: async () => 
    await api.get(`/individual/questions`).then((res) => {
      return res.data;
    })
  })
  
  
  // const individualExams = ExamQuestions && ExamQuestions[1] && ExamQuestions[1]
 
  return (
    <div>dall exam</div>
  )
}
