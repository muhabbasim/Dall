"use client"
 
import * as React from "react"
 
import { Progress } from "@/components/ui/progress"
 
export function ProgressBar() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    setProgress(50)
  }, [])
 
  return(
    <div className="w-[80%] md:w-[60%] py-4">
      <div className="w-full flex items-center justify-center">
        <span className='font-bold text-rose-800 pb-2'>%43</span>
      </div>
        <Progress value={progress} className="md:w-[99%]"/>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="">
            %0
          </h1>
          <h1 className="">
            %100
          </h1>
        </div>
      </div>
    </div>

  ) 
}