'use client'

import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import './vision.css';
import { Separator } from '../ui/separator';
import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
}


const ValueWrapper = ({ children }:Props) => {

  const faqElement = useRef(null);
  const { scrollYProgress } = useScroll({
    target: faqElement,
    offset: ["start end", "end start"],
    
  });

  const opacity = useTransform(scrollYProgress, [1, 0.5, 0], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [1, 0.4, 0], [0.3, 0, 200]);
  return (
    <motion.div 
      ref={faqElement}
      style={{ opacity, y}}
    >
      {children}
    </motion.div>
  )
}


export default function Vision() {

  const advantages =[
    {
      id: 1,
      title:"Artificial intelligent tools",
      desc: "Using artificial intelligence tools to analyze test results to derive valuable insights from the data generated through testing thins this involve Artificial intelligence tools excel in interpreting test results by recognizing intricate.",
    },
    {
      id: 2,
      title:"The first Arabic scale measurement",
      desc: "Utilizing the first Arabic scale to measure individuals' abilities through mathematical algorithms valuable insights from the data generated through testing thins.",
    },
    {
      id: 3,
      title:"Centralized database",
      desc: "Centralized database for linking and analyzing intelligent data for results to derive valuable insights from the data generated through testing thins this involve Artificial intelligence tools excel in interpreting test results by recognizing intricate patterns and correlations within the data. This goes beyond traditional analysis methods.",
    },
  ]

  const visionTitle = useRef(null);
  const VisionJourny = useRef(null);
  const isInView = useInView(visionTitle, { margin: "-20% 0px -80% 0px",  once: true});
  const isInViewJourny = useInView(VisionJourny, { margin: "-80% 0px -20% 0px" });
  const controls = useAnimation();

  const titleAnimation = {
    hidden: {
      opacity: 0,
      y: 200,
    },
  
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
      },
    },
  };

  const iconAnimation = {
    iconHidden: {
      opacity: 0,
      y: -400,
    },
  
    iconVisible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
      },
    },
  };

  const journyAnimation = {
    journyHidden: {
      opacity: 0,
      x: -400,
    },
  
    journyVisible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.1,
      },
    },
  };

  useEffect(() => {

    const show = () => {
      controls.start('visible');
      controls.start('iconVisible');
    }
    const Journyshow = () => {
      controls.start('journyVisible');
    }

    if(isInView) {
      show();
    } 

    if(isInViewJourny) {
      Journyshow();
    } 
  }, [isInView, isInViewJourny, controls])

  return (
    <div id='vision' className='vision_container  text-white w-full md:px-48 px-20 '>
      <div className='  p-20 rounded-2xl text-black'>
        <div className=' h-full md:flex items-center md:space-x-16'>
          <div className='space-y-10 max-w-[60%]'>
         
            <motion.h1
              ref={visionTitle}
              initial="hidden"
              animate={controls}
              variants={titleAnimation}
              transition={{
                duration: '1',
                delay: 1,
              }}
              className='vision_title text-6xl '
            >
              Vision and Goals
            </motion.h1>

            <p 
              className='vision_text_color text-2xl '
              
            >
              A portal to assist decision-making leaders who seek to discover human capabilities and align them with roles that match their abilities, aiming for enhanced productivity and cost-effective, balanced expenditure in training and recruitment. Also for individuals looking for creativity in finding their best-fit job.
            </p>
          </div>
          <div className='md:flex items-center gap-10 justify-around'>
            <motion.div 
              ref={visionTitle}
              initial="iconHidden"
              animate={controls}
              variants={iconAnimation}
              transition={{
                duration: '1',
                delay: 3
              }}
              className='w-full flex items-center justify-center'
            >
              <img className='vision_logo_img ' src="./assets/logo.png" alt="logo pic" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className='added-values mt-72 md:px-48'>
        <h1 className='added_values_title text-4xl mb-20 text-center'>Our competetive advantages</h1>

        <div className='space-y-2'>
          {advantages.map((item) => (
            <ValueWrapper key={item.id}>

              <div  className='vision_card'>
                <div className='flex items-center gap-10'>
                  <span className='font-bold text-2xl'>{item.id}</span>
                  <div className='h-full w-full flex gap-10'>
                    <Separator color='red' orientation='vertical' className='w-[5%] h-[2px] my-5'/>
                    <Separator orientation='vertical' className='w-[95%] h-[1px] my-5 opacity-10'/>
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 px-10 py-10 gap-7'>
                  <p className='competitive_title text-3xl font-bold w-[70%]'>{item.title}</p>
                  <p className='vision_desc'>{item.desc}</p>
                </div>
              </div>
            </ValueWrapper>

          ))}

        </div>
      </div>
      
      <div className='w-full h-[50vh] mt-60 text-center'>
        <motion.h4 
          ref={VisionJourny}
          initial="journyHidden"
          animate={controls}
          variants={journyAnimation}
          transition={{
            duration: '1',
            delay: 1,
          }}
        className='added_values_title text-4xl mb-20 text-center'>Our Journey</motion.h4>
        <div className=''>
          <p className='text-2xl'>Our engagement with artificial intelligence data analysis commenced during our academic tenure, spanning from school to university and subsequently extending into professional realms within various companies</p>
        </div>
      </div>

    </div>
  )
}
