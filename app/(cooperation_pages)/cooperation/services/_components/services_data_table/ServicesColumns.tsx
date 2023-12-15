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




export type Service = {
  id: number;
  type: string;
  nubmer_seats: number;
  random_strings: string;
  status: string
  start_date: Date;
}

const handleDetails = () => {
  console.log('details')
}

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          className="flex items-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div
          className="items-start"
        >
          Serivce type
        </div>
      )
    },
    cell: ({ row }) => {
      const type = row.getValue("type") || false;

      return (
        <h1 className={cn('')}>
          <>
            {type}
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start date
        </div>
      )
    },
    cell: ({ row }) => {
      const start_date = row.getValue("start_date") || false;

      return (
        <>
          {start_date}
        </>
      )
    }
  },
  {
    accessorKey: "seats",
    header: ({ column }) => {
      return (
        <div
          className="items-start"
        >
          Number of seats
        </div>
      )
    },
    cell: ({ row }) => {
      const seats = row.getValue("seats");

      return (
        <Badge 
          className={cn(
            "bg-sky-700 w-20 flex items-center justify-center"
          )}
        >
          <>
            {seats}
          </>
        </Badge>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          className="items-start w-40"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </div>
      )
    },
    cell: ({ row }) => {
      const isSucess = row.getValue("status") || false;

      return (
        <Badge className={cn(
          "bg-slate-500 flex items-center justify-center",
          isSucess === 'paid' && "bg-sky-700",
          isSucess === 'failed' && "bg-rose-900",
        )}>
          <>
            {isSucess}
          </>
        </Badge>
      )
    }
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.getValue("id");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-4 p-0">
              
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent> 

            <Link className="" href={`/cooperation/services/service_details/${id}`}>
              <DropdownMenuItem className="cursor-pointer">
                Details
                <Eye className="h-4 w-4 ml-2"/>
              </DropdownMenuItem>
            </Link>
           
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]