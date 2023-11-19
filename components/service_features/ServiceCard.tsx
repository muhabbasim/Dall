import { cn } from '@/lib/utils';
import React from 'react'
import { useSrvicesStore } from './store';

type FeatureCardProps = {
  gradient: string;
  children: React.ReactNode;

} & CardProps;

type CardProps = {
  id: number
}

const ServiceCard = ({gradient, children, id}: FeatureCardProps) => {

  const  inViewService = useSrvicesStore(state => state.inViewService)

  return (
    <div className={cn('absolute inset-0 h-full w-full rounded-full bg-gradient-to-r transition-all border-8 border-gray-400',
      gradient,
      inViewService === id ? "opacity-100 scale-100" : 'opacity-0 scale-0'
    )}>
      {children}
    </div>
  )
}


export const Twafuq = ({id}: CardProps) => {
  return (
    <ServiceCard id={id} gradient="from-[#f7f0ff] to-[#a78afe]">
      <img src="./assets/logo.png" alt="" />
    </ServiceCard>
  );
};

export const Tamkeen = ({id}: CardProps) => {
  return (
    <ServiceCard id={id} gradient="from-[#fff7f5] to-[#ffd8ad]">
      <img src="./assets/2logo.png" alt="" />
    </ServiceCard>
  );
};

export const Dall = ({id}: CardProps) => {
  return (
    <ServiceCard id={id} gradient="from-[#fef5ff] to-[#ffade1]">
      <img src="./assets/3logo.png" alt="" />
    </ServiceCard>
  );
};
