"use client"

import { Button } from "./ui/button";
import Link from "next/link";

export default function NavbarRoutes() {

  const navbarItems = [
    {name: 'الرئيسية'},
    {name: 'رؤيتنا وأهدافنا'},
    {name: 'خدماتنا'},
    {name: 'أعمالنا المستقبلية'},
    {name: 'فريق العمل'},
    {name: 'تواصل معنا'},
  
  ]


  return (
    <>
      <div className={` w-full flex flex-row-reverse items-center justify-between gap-x-4 ml-auto pt-12`}>
        {/* <div className="flex items-center gap-6 flex-row-reverse"> */}

        <div className=" rounded-[50%]	overflow-hidden">
          <img className="w-14 h-14 object-cover" src="logo.jpg" alt="logo image" />
        </div>
        <div className="hidden flex-row-reverse gap-6 md:flex ">
          {navbarItems.map((item, i) => (
            <Link href="/" className="text-lg px-3 py-1 rounded-lg text-white hover:bg-blue-100 hover:bg-opacity-70 hover:text-blue-800" key={i}>
              {item.name}  
            </Link>
          ))}
        </div>
        {/* </div> */}
        
        <div className="hidden md:flex gap-6">
          <Button variant={"secondary"}>
            انشاء حساب 
          </Button>
          <Button variant={'default'}>
            تسجيل الدخول
          </Button>
        </div>
      </div>
    </>
  )
}
