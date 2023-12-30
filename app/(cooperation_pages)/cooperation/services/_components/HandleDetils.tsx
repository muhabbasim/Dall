import { Eye, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

type Props = {
  id: number
}
export default function HandleDetils({ id }: Props) {
  const router = useRouter();

  const handleDetailFunction = (id: number) => {
    router.push(`/cooperation/services/service_details/${id}`)
  }

  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-4 w-4 p-0">
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent> 
        <button className="" 
          onClick={() => handleDetailFunction(id)}
          // href={`/cooperation/services/service_details/${id}`}
        >
          <DropdownMenuItem className="cursor-pointer">
            Details
            <Eye className="h-4 w-4 ml-2"/>
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu> 

    
  )
}
