'use client'
import React, { useRef, useState } from 'react'
import './faq.css';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
  // onClick: (event: any) => void;
}

const FAQWrapper = ({ children }:Props) => {

  const faqElement = useRef(null);

  const { scrollYProgress } = useScroll({
    target: faqElement,
    offset: ["start end", "end start"],
    
  });

  const opacity = useTransform(scrollYProgress, [1, 0.5, 0], [1, 1, 0]);
  const x = useTransform(scrollYProgress, [1, 0.2, 0], [0, 0, -2000]);
  

  return (
    <motion.div 
      className={`item space-y-2`} 
      ref={faqElement}
      style={{ opacity, x}}
    >
      {children}
    </motion.div>
  )
}

export default function FAQ() {

  const FAQdata = [
    {
      question: "What is the capital of France?",
      answer: "The Vaccination stimulates the immune system by introducing a weakened or inactivated form of a pathogen. This helps the body develop immunity, so if exposed to the actual pathogen later, the immune system can respond more effectively Vaccination stimulates the immune system by introducing a weakened or inactivated form of a pathogen. This helps the body develop immunity, so if exposed to the actual pathogen later, the immune system can respond more effectively capital of France is Paris."
    },
    {
      question: "How does photosynthesis work?",
      answer: "Photosynthesis Vaccination stimulates the immune system by introducing a weakened or inactivated form of a pathogen. This helps the body develop immunity, so if exposed to the actual pathogen later, the immune system can respond more effectively is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll, converting carbon dioxide and water into glucose and oxygen."
    },
    {
      question: "What is the main function of the human heart?",
      answer: "The human heart is a muscular Vaccination stimulates the immune system by introducing a weakened or inactivated form of a pathogen. This helps the body develop immunity, so if exposed to the actual pathogen later, the immune system can respond more effectively organ that pumps blood throughout the body, providing oxygen and nutrients to the cells and removing waste products."
    },
    {
      question: "How does the internet work?",
      answer: "The internet is a global network of interconnected Vaccination stimulates the immune system by introducing a weakened or inactivated form of a pathogen. This helps the body develop immunity, so if exposed to the actual pathogen later, the immune system can respond more effectively computers that communicate with each other using standardized protocols. It allows the transfer of data and information between devices worldwide."
    },
    {
      question: "What is the meaning of life?",
      answer: "The meaning of life  Vaccination stimulates the immune system by introducing a weakened or inactivated form of a pathogen. This helps the body develop immunity, so if exposed to the actual pathogen later, the immune system can respond more effectively is a subjective and philosophicalquestionwith no universally agreed-uponanswer It often depends on individual beliefs, values, and perspectives."
    },
    {
      question: "How does a computer process information?",
      answer: "Computers process information using a  Vaccination stimulates the immune system by introducing a weakened or inactivated form of a pathogen. This helps the body develop immunity, so if exposed to the actual pathogen later, the immune system can respond more effectively combination of hardware and software. The central processing unit (CPU) executes instructions stored in memory, performing calculations and operations to process data."
    },
  
  ]

  const [ selected, setSelected ] = useState(null)

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i)
  }


  return (
    <div id='FAQ' className=' px-10 py-40 md:px-72 md:py-60 md:flex md:flex-col md:gap-20 space-y-14 justify-center items-center '>
      <h1 className='faq_title text-6xl font-bold leading-[80px] text-center text-white max-w-xl'>
        Frequently Asked Questions
      </h1>
      <div className='accordion flex flex-col gap-6 max-w-4xl'>
        {FAQdata.map((item, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
          >
            <FAQWrapper
            >
              <div className='title flex justify-between items-center transition-all'>
                <h2 className='text-2xl ml-5 faq_title'>
                  {item.question}
                </h2>
                <div className={`arrow_circle transition-all ${ selected === i && 'arrow_circle_rotate'}`}>
                  <ChevronDown/>
                </div> 
              </div>
              <p className={`content faq_title transition-all ${ selected === i && 'show'}`}>
                {item.answer}
              </p>
            </FAQWrapper>
          </div>

        ))}
        
        <div className='text-center'>
          <button className='FAQ_btn'>See more</button>
        </div>
      </div>
    </div>
  )
}

