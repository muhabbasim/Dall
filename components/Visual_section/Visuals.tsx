'use client'
import ImageScal from '../ImageScal'
import './visual_section.css'

export default function Visuals() {
  return (
    <div className="videoWrapper min-h-[100vh] text-center pt-60 md:px-48 p-72">
      <ImageScal >
        <video autoPlay loop muted
          className='video_element w-full object-cover fixed z-[-10] shadow-md shadow-black'
        >
          <source src="video.mp4" />
        </video>
      </ImageScal>
    </div>
  )
}
