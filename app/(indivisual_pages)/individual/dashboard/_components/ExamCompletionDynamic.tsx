import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

type Props = {
  status: 'paid' | 'waiting-for-payment' | 'failed';
  isStarted: boolean;
  isCompleted: boolean;
  examId: number;
}

export default function ExamCompletionDynamic({ status, isStarted, examId, isCompleted }: Props ) {

  const router = useRouter();

  const handleExam = () => {
  
    if (!isCompleted) {
      router.push(`/individual/exams/${examId}`);
      toast.success('Exam started.. Good luck!');
      return;
    }
    toast.success('Exam completed, see result');
  }

  return (
    <Badge
      onClick={handleExam}
      className={cn(
        "bg-slate-500 cursor-pointer",
        isStarted && "bg-sky-700",
        status === 'waiting-for-payment' && 'hidden',
        status === 'failed' && 'hidden',
        isStarted && isCompleted  && ' bg-cyan-600'
      )}
    >
      {status === 'paid' && !isStarted && "Start"}
      {status === 'paid' && isStarted && !isCompleted && "Continue"}
      {status === 'paid' && isStarted && isCompleted && "Completed"}
    </Badge>
  )
}

