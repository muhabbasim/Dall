'use client'

import React, { useEffect, useRef } from 'react'
import './projects.css';
import { motion, useAnimation, useInView } from 'framer-motion'
import HorizentalWrapper from '../HorizentalWrapper';

export default function Projects() {


  const projects = [
  
    {
      "name": "Ai Analysis",
      "description": "Empowering communities through innovative solutions. Join us on a journey to make a positive impact on the world.",
      "date": "2023-02-28",
      "imageUrl": "https://images.unsplash.com/photo-1599814733655-eb9434004bf8?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "url": "https://example.com/projectB"
    },
    {
      "name": "Children cognative ablility",
      "description": "Unlock the future with cutting-edge technology. Dive into a world of possibilities and stay ahead in the digital era.",
      "date": "2023-03-20",
      "imageUrl": "https://images.unsplash.com/photo-1583912086372-f0ec57d33f4d?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "url": "https://example.com/projectC"
    },
    {
      "name": "Digital sport clup",
      "description": "Innovative solutions for a sustainable future. Join us in creating a greener world through eco-friendly practices and technologies.",
      "date": "2023-04-10",
      "imageUrl": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "url": "https://example.com/projectD"
    }
  ]

  const projectRef = useRef(null);
  const isInView = useInView(projectRef, { margin: "-20% 0px -80% 0px",  once: true });
  const controls = useAnimation();

  const projectAnimation = {
    projectsHidden: {
      opacity: 0,
      x: -400,
      y: -400,
    },
  
    projectsVisible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 1.1,
      },
    },
  };

  useEffect(() => {

    const show = () => {
      controls.start('projectsVisible')
    }

    if(isInView) {
      show();
    }
  }, [isInView, controls])

  return (
    <div ref={projectRef} className=' min-h-[100vh] pt-[30vh] pb-52 w-full bg-white md:px-48 py-20 space-y-20 '>
      <div className='flex justify-center items-center'>
        <h1 className='projects_title text-6xl font-bold leading-[80px] text-center max-w-xl drop-shadow-xl'>Up comming projects</h1>
      </div>
      <HorizentalWrapper
        direction={300}
        height='400px'
      >

        <div className='project_cards_container flex flex-col md:flex md:flex-row gap-5 justify-around items-center'>
          {projects.map((project, i) => (
            <motion.div
              initial={'projectsHidden'}
              animate={controls}
              variants={projectAnimation}
              transition={{ 
                duration: 0.7,
                delay: i * 0.1
              }}
              key={i}  
              className='projects_card text-white rounded-xl' 
              style={{backgroundImage: `url(${project.imageUrl})`, backgroundSize: "cover"}}
            >
              <div className='project_card_overlay h-full w-full flex flex-col justify-between p-10 cursor-pointer rounded-xl'>
                <h1 className='project_title text-3xl font-bold'>{project.name}</h1>
                <div className=''>
                  <p className='project_desc'>{project.description}</p>
                  <p className='project_date mt-5'>{project.date}</p>
                </div>
              </div>
            </motion.div>
          ) )}
        </div>
      </HorizentalWrapper>

    </div>

  )
}
