'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import './services.css';
import { stylesWithCssVar } from "@/lib/motion";

export default function Services() {

 
  const servise = [
    {
      src: '',
      title: 'توافق',  
      desc:  'لقياس قدرات الباحثين عن عمل وربطهم بسوق العمل',
      btnUrl: '',
    },
    {
      src: '',
      title: 'توافق',  
      desc:  'لقياس قدرات الباحثين عن عمل وربطهم بسوق العمل',
      btnUrl: '',
    },
    {
      src: '',
      title: 'توافق',  
      desc:  'لقياس قدرات الباحثين عن عمل وربطهم بسوق العمل',
      btnUrl: '',
    },
    {
      src: '',
      title: 'توافق',  
      desc:  'لقياس قدرات الباحثين عن عمل وربطهم بسوق العمل',
      btnUrl: '',
    },
  ]

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });
  const textX = useTransform(scrollYProgress, [0.1, 0.7], ["100%", "-100%"]);
  const opacitySection = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.7], [1, 0.7]);

  const opacityBorder = useTransform(
    scrollYProgress,
    [0.7, 0.71, 0.72],
    [1, 1, 0]
  );
  const finalTextOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.71, 0.72, 0.8, 0.9],
    [0, 0, 1, 1, 0]
  );

  const finalTextScale = useTransform(scrollYProgress, [0.8, 0.9], [1, 0.7]);

  return (
    <motion.section
      style={stylesWithCssVar({
        opacity: opacitySection,
        "--scale": scale,
        "--opacity-border": opacityBorder,
      })}
      ref={targetRef}
      className="mt-[50vh] flex h-[500vh] items-start justify-start"
    >
      <div className="sticky top-1/2 left-1/2 min-h-[50rem] min-w-[50rem] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap before:absolute before:inset-0 before:scale-[var(--scale)] before:border-[2.5rem] before:border-[#CEF144] before:opacity-[var(--opacity-border)]">
        <motion.p
          aria-hidden
          style={{ x: textX, y: "-50%" }}
          className="whitepspace-nowrap min-w-screen absolute top-1/2 left-[calc(-50vw+25rem)] text-[23rem] text-heading"
        >
          Streamlined Experience.
        </motion.p>
        <motion.p
          aria-hidden
          style={{ x: textX, y: "-50%" }}
          className="whitepspace-nowrap min-w-screen absolute top-1/2 left-[calc(-50vw+25rem)] z-[11] text-[23rem] text-transparent [-webkit-text-stroke:2px_var(--color-heading)]"
        >
          Streamlined Experience.
        </motion.p>

        <motion.p
          style={{
            opacity: finalTextOpacity,
            scale: finalTextScale,
            y: "-50%",
            x: "-50%",
          }}
          className="absolute left-1/2 top-1/2 text-[8.8rem] leading-tight text-black"
        >
          Streamlined
          <br />
          Experience.
        </motion.p>
        <span className="absolute left-[calc(50%*var(--scale)+50%)] top-0 z-10 h-full w-[50vw] origin-left scale-[var(--scale)] bg-background opacity-[var(--opacity-border)]" />
        <span className="absolute left-[calc(50%*var(--scale)+50%-(2.5rem*var(--scale)))] top-0 z-[12] h-full w-[50vw] origin-left scale-[var(--scale)] border-l-[2.5rem] border-[#CEF144] opacity-[var(--opacity-border)]" />
      </div>
    </motion.section>
  )
}


// <div className="bg-white min-h-[100vh] text-center pt-60 md:px-48 p-72">
//   <div className="w-full h-[600px] rounded-xl">

//     <h1 className="title text-4xl">خدماتنا</h1>
//     <div className='px-36'>
//       <div className=' w-96 h-72  overflow-hidden  bg-white border border-black rounded-lg'>
//         <div className='w-full h-[40%]  '>
//           <img className='w-full h-full object-cover' src="https://pudder.imgix.net/fotografer/Sara/A-New-Type-of-Imprint/SAS_Mariama_2_1166V2_flat_final.jpg?auto=compress%2Cformat&bg=%23FFFFFF&crop=focalpoint&fit=crop&fm=jpg&fp-x=0.5&fp-y=0.5&h=3733&q=90&w=2800&s=c5738e4e6a8ad387d3e78665df14da12" alt="" />
//         </div>
//         <div className='flex h-[50%] w-full flex-col justify-center gap-5'>
//           <h1>توافق</h1>
//           <p>لقياس قدرات الباحثين عن عمل وربطهم بسوق العمل</p>
//         </div>
//         <Button variant={'destructive'}>
//           اكتشف اكثر
//         </Button>
//       </div>
//     </div>
//   </div>
// </div>