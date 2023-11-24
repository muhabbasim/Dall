import { cn } from '@/lib/utils'
import { useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { useSrvicesStore } from './store';

interface Props {
  children: React.ReactNode;
  id: number;
}

export default function SingleService({ children, id }: Props) {

  const ref = useRef(null) 
  const isInView = useInView(ref, { margin: "-40% 0px -60% 0px"})
  
  const  setInViewService = useSrvicesStore(state => state.setInViewService)
  const  inViewService = useSrvicesStore(state => state.inViewService)
 
  useEffect(() => {
    if (isInView) setInViewService(id);
    if (!isInView && inViewService === id) setInViewService(null);
  }, [isInView, id, setInViewService, inViewService]);

  return (
    <div ref={ref} className={cn('min-h-screen text-white font-bold flex flex-col gap-32 transition-all',
    isInView ? "text-white opacity-1" : 'text-black opacity-30')}
    >
      {children}
    </div>
  )
}
