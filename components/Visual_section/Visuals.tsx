'use client'
import ImageScal from '../ImageScal'
import './visual_section.css'

export default function Visuals() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] md:px-32 ">
      <ImageScal >
        <video autoPlay loop muted
          className='video_element object-fit md:w-auto md:h-[700px] shadow-md shadow-black'
        >
          <source src="./assets/videos/Dall-video.mp4" />
        </video>
      </ImageScal>
    </div>
  )
}
