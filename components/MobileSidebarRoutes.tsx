"use client"

import { Button } from "./ui/button";
import Link from "next/link";

export default function MobileSidebarRoutes() {

  const navbarItems = [
    {name: 'Home'},
    {name: ' Visions'},
    {name: 'Services'},
    {name: 'Future Projects'},
    {name: 'Management'},
    {name: 'Contact us'},
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
            <Button className="w-40" variant={"secondary"}>
              Register
            </Button>
          </Link>
          <Link href='/'>
            <Button className="w-40"  variant={'default'}>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
