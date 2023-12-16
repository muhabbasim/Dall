"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";




type individualsProps = {
  name: string;
  email: string;
  image: string;
  phone: string;
  verification: boolean;
  is_verified: boolean;
}

const handleDetails = () => {
  console.log('details')
}

export const columns: ColumnDef<individualsProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          className="flex items-start cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="items-start"
        >
           Name
        </div>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("name") || false;

      return (
        <h1 className={cn('w-28')}>
          <>
            {name}
          </>
        </h1>
      )
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="items-start"
        >
          Email
        </div>
      )
    },
    cell: ({ row }) => {
      const email = row.getValue("email") || false;

      return (
        <h1 className={cn('')}>
          <>
            {email}
          </>
        </h1>
      )
    }
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          className="items-start"
        >
          Phone
        </div>
      )
    },
    cell: ({ row }) => {
      const phone = row.getValue("phone") || false;

      return (
        <h1 className={cn('')}>
          <>
            {phone}
          </>
        </h1>
      )
    }
  },

  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <div
          className="items-start w-28"
        >
          Start date
        </div>
      )
    },
    cell: ({ row }) => {
      const verification = row.getValue("verification") || false;

      return (
        <>
        {verification}
        </>
      )
    }
  },
  {
    accessorKey: "verification",
    header: ({ column }) => {
      return (
        <div
          className="items-start"
        >
          Exam result
        </div>
      )
    },
    cell: ({ row }) => {

      return (
        <Badge 
          className={cn(
            "bg-sky-700 w-28 flex items-center justify-center"
          )}
        >
          <>
            No results yet
          </>
        </Badge>
      )
    }
  },
  {
    accessorKey: "retult",
    header: ({ column }) => {
      return (
        <div
          className="items-start"
        >
          Display result
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </div>
      )
    },
    cell: ({ row }) => {

      return (
        <Badge className={cn("bg-slate-500 ")}>
          <>
            Show
          </>
        </Badge>
      )
    }
  },
  
  // {
  //   id: "actions",
  //   header: ({ column }) => {
  //     return (
  //       <div
  //         className="items-start"
  //       >
  //         Action
  //       </div>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     const id = row.getValue("id");

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-4 w-4 p-0">
              
  //             <MoreHorizontal className="h-4 w-4"/>
  //           </Button>
  //         </DropdownMenuTrigger>

  //         <DropdownMenuContent> 

  //           <Link className="" href={`/cooperation/services/service_details/${id}`}>
  //             <DropdownMenuItem className="cursor-pointer">
  //               Details
  //               <Eye className="h-4 w-4 ml-2"/>
  //             </DropdownMenuItem>
  //           </Link>
           
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   }
  // }
]
