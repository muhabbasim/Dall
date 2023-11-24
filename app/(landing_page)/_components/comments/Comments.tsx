'use client'
import './comment.css'
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import HorizentalWrapper from '../HorizentalWrapper';


export default function Comments() {

  const comments = [
  
    {
      "name": "Edirson Patrick",
      "feild": "Engnnier",
      "comment": "Empowering communities through innovative solutions. Join us on a journey to make a positive impact on the world.",
      "date": "2023-02-28",
      "imageUrl": "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      "name": "Children cognative ablility",
      "feild": "Ai Developer",
      "comment": "Unlock the future with cutting-edge technology. Dive into a world of possibilities and stay ahead in the digital era.",
      "date": "2023-03-20",
      "imageUrl": "https://images.unsplash.com/photo-1619145512650-2c1237f40086?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      "name": "Digital sport clup",
      "feild": " Technician",
      "comment": "Innovative solutions for a sustainable future. Join us in creating a greener world through eco-friendly practices and technologies.",
      "date": "2023-04-10",
      "imageUrl": "https://images.unsplash.com/photo-1516907813517-981b8c389aa2?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      "name": "Diago port",
      "feild": "Professor",
      "comment": "Innovative solutions for a sustainable future. Join us in creating a greener world through eco-friendly practices and technologies.",
      "date": "2023-04-10",
      "imageUrl": "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  ]


  return (
    <div id='Testimonials' className='comment_container  md:min-h-[100vh] min-h-[220vh] md:px-48 py-20 space-y-20 px-20'>
      <div className='flex justify-center items-center'>
        <motion.h1 
          className='comment_title text-6xl font-bold leading-[80px] text-center max-w-xl drop-shadow-xl'
        >
          What our clients said about us
        </motion.h1>
      </div>

      <HorizentalWrapper 
      direction={-300}
      height='400px'>

      <Swiper
         modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode]}
         spaceBetween={50}
         slidesPerView={2}
         scrollbar={{ draggable: true }}
         breakpoints={{
          220: {
            slidesPerView: 1,
            spaceBetween: 65,
          },
          620: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          1240: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          2000: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
         }}
        // freeMode={true}
        className='h-[50vh] py-40'
      >
          {comments.map((comment, i) => (
            <SwiperSlide key={i} className='py-20'>
              <div className='comment_card flex text-white p-10 items-center gap-10 rounded-3xl'>
                <div className='comment_img_container w-[30%] rounded-xl'>
                  <img className='comment_img object-cover' src={comment.imageUrl} alt="comment pics" />
                </div>   
                <div className='w-[70%] ml-10'>
                  <div className='comment_info space-y-1'>
                    <h1 className='comment_name text-3xl'>
                      {comment.name}
                    </h1>
                    <h3 className='text-2xl'>
                    {comment.feild}
                    </h3>
                  </div>
                  <p className='comment_desc mt-9'>{comment.comment}</p>
                </div>
              </div>
            </SwiperSlide>

          ))}
      </Swiper>
      </HorizentalWrapper>

    </div>
  )
}
