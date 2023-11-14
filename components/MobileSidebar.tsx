import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import MobileSidebarRoutes from './MobileSidebarRoutes'


export default function MobileSidebar() {

  return (
    <div className='flex justify-center items-center md:hidden'>
      <Sheet>
        <SheetTrigger aria-controls="radix-:R1mcq:">
          <Menu color='white'/> 
        </SheetTrigger>
        <SheetContent side="right" className='w-[300px] p-0'>
            <MobileSidebarRoutes />
        </SheetContent>
      </Sheet>
    </div>
  )
}
