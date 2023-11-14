import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import './footer.css'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export default function Footer() {
  const footerData = [
    {
      name: "RESOURCES",
      items: [
        "Welcome to Our Website",
        "About Us",
        "Contact Information",
        "User Account",
        "Latest Updates",
      ]
    },
   
    {
      name: "SUPPOTR",
      items: [
        "Welcome to Our Website",
        "About Us",
        "Contact Information",
        "User Account",
        "Latest Updates",
      ]
    },
   
    {
      name: "SERVICES",
      items: [
        "Welcome to Our Website",
        "About Us",
        "Contact Information",
        "User Account",
        "Latest Updates",
      ]
    },
   
  ]

  return (
    <div className='footer md:px-48 md:py-20'>
      <div className="md:flex items-center md:gap-32">
        <div className='space-y-5 md: min-w-[400px]'>
          <h1 className='footer_logo_text text-6xl text-white'>BEGINING</h1>
          {/* <div className='flex gap-2 items-center justify-between'>
            <Input></Input>
            <Button placeholder='Enter your email'>Subscirbe</Button>
          </div> */}
        </div>
        <div className=" w-full grid grid-cols-2 md:grid-cols-3 ">
          {footerData.map((cats, i) => (
            <div key={i} className=' text-white space-y-5'>
              <span className='text-2xl'>{cats.name}</span>
              <div className='space-y-3'>
                {cats.items?.map((cat, i) => (
                  <div key={i} className='flex flex-col'>
                    <Link href=''>
                      <span className=' text-gray-400 hover:text-cyan-300'>{cat}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>


      <Separator orientation='vertical' className='w-full h-[1px] my-5 opacity-10'/>
      <div className=" flex items-center justify-between  bottom text-white space-y-3">
        <div className="flex">
          <h2>BEGINING</h2>
          <span>@BEGINING.co limited 2023</span>
        </div>

        <div className="flex items-center gap-10">
          <Facebook className='footer_icon' size={30}/>
          <Instagram className='footer_icon' size={30}/>
          <Twitter className='footer_icon' size={30}/>
          <Linkedin className='footer_icon' size={30}/>
        </div>
      </div>
    </div>
  )
}
