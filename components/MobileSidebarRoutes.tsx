"use client"

import { Button } from "./ui/button";
import Link from "next/link";

export default function MobileSidebarRoutes() {

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
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col gap-6 items-center">
          {navbarItems.map((item, i) => (
            <Link href="/" key={i}>
              <div className="text-lg">
                {item.name}  
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-6 mt-10 items-center">
          <Link href='/'>
            <Button variant={'secondary'}>
              انشاء حساب 
            </Button>
          </Link>
          <Link href='/'>
            <Button variant={'default'}>
              تسجيل الدخول
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
