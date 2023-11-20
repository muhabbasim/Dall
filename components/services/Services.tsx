'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import './services.css';
import Visuals from "../Visual_section/Visuals";

import SingleService from "../service_features/SingleService";
import { Dall, Tamkeen, Twafuq } from "../service_features/ServiceCard";
import AnimatedText from "../AnimatedText";


export default function Services() {

  const servises = [
    {
      id: 1,
      url: '',
      title: 'Twafuq',  
      desc:  'To conduct a thorough assessment of students capabilities and establish a seamless connection between their skill sets and the dynamic demands of the job market. This entails a comprehensive evaluation designed to measure proficiency, ensuring a strategic alignment with opportunities in the professional landscape.',
      btnUrl: '',
      card: Twafuq,
    },
    {
      id: 2,
      url: '',
      title: 'Tamkeen',  
      desc:  'To evaluate the aptitudes of students and establish a linkage between their skill sets and the demands of the job market. This involves a comprehensive assessment aimed at gauging their proficiency and readiness for successful integration into professional domains',
      btnUrl: '',
      card: Tamkeen,
    },
    {
      id: 3,
      url: '',
      title: 'Dall',  
      desc:  'A platform designed to assist students and job seekers by analyzing the needs of the job market, individuals capabilities, and connecting them through artificial intelligence algorithms',
      btnUrl: '',
      card: Dall,
    },
  
  ]

  return (

    <div id="services" className="services_container bg-white md:px-48 px-10">
      <div className="w-full pt-56">

      <AnimatedText
          el="h1"
          text={[
            "Our services",
          ]}
          className="service_title text-6xl font-bold"
          once
          // repeatDelay={10000}
        />
        {/* <h1 className='service_title text-6xl font-bold'>
          Our services
        </h1> */}
      </div>
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 w-full min-h-screen items-start">
        <div className="flex flex-col gap-32 pt-[20vh]">
          {servises.map((service) => (
            <SingleService id={service.id} key={service.id}>
              <div>
                <span className="text-2xl ml-[-30px] ">{service.id}</span>
                <h1 className="text-6xl">{service.title}</h1>
              </div>

              <div className=" flex flex-col">
                <p className="service_desc text-2xl">{service.desc}</p>

                <div className="flex gap-8 mt-16">
                  <button className='bg-transperante border border-white px-16 py-3 text-lg rounded-md'>
                    Explore More
                  </button>
                  <button className='services_btn px-16 py-3 text-lg rounded-md'>
                    Register
                  </button>
                </div>
              </div>
            </SingleService>
          )) }
        </div>

        <div className="sticky top-0 flex h-screen w-full items-center">
          <div className="relative aspect-square w-full rounded-2xl">
            {servises.map((feature) => (
              <feature.card id={feature.id} key={feature.id}/>
            ))}
          </div>
        </div>

      </div>

      <Visuals/>
    </div>
  )
}
