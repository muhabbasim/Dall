'use client'
import ImageScal from '../ImageScal'
import './visual_section.css'

export default function Visuals() {
  return (
    <div className="videoWrapper min-h-[80vh] md:px-32 ">
      <ImageScal >
        <video autoPlay loop muted
          className='video_element object-fill  shadow-md shadow-black'
        >
          <source src="video.mp4" />
        </video>
      </ImageScal>
    </div>
  )
}
