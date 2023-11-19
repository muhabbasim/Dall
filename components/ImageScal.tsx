import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function ImageScal({children}: Props) {

  const sectionRef = useRef(null);

  // scrollYProgress is a value between 0 and 1
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const xtransfrom = useTransform(scrollYProgress, [0, 0.5, 0.1, 0], [10, 0, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <div ref={sectionRef}>
      <motion.div style={{
        scale: scale,
        x: xtransfrom,
        opacity: opacity,
        width: '100%',
      }}>
        {children}
      </motion.div>
    </div>
  )
}
