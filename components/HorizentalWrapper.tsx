'use client'
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
  direction: number;
  height: string;
}
export default function HorizentalWrapper( {children, direction, height}: Props ) {
  
  const scrollRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, direction]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 1, 0]);


  
  return (
    <div ref={scrollRef} style={{ width: '100%'}}>
      <motion.div style={{
        height: height,
        zIndex: 6,
        position: 'relative',
        translateX: xTransform,
        opacity: opacity
      }}>
        {children}
      </motion.div>
    </div>
  )
}
