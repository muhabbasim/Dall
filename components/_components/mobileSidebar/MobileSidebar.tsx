import React from 'react'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

export default function MobileSidebar() {
  return (
    <div className='md:hidden w-full'>
      <Sheet>
        <SheetTrigger aria-controls="radix-:R1mcq:">
          <Menu/>
        </SheetTrigger>
        <SheetContent side="left" className='w-[300px] p-0'>
          <SheetClose>
            {/* Add routes */}
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  )
}
