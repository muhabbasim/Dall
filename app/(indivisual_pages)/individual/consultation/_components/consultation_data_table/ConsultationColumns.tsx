"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@radix-ui/react-checkbox";


export type Exam = {
  id: number;
  individual_id: number;
  contact_type: string;
  consultation_type_id: number;
  week_day_id: number;
  consultation_time_id: number;
  status: string
  created_at: Date;
}


export const columns: ColumnDef<Exam>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          className='items-start flex' 
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    }
  },
  {
    accessorKey: "contact_type",
    header: ({ column }) => {
      return (
        <div
          className='items-start'
        >
          Contact type
        </div>
      )
    },
    cell: ({ row }) => {
      const contact_type = row.getValue("contact_type");

      return (
        <Badge 
          className={cn(
            "bg-sky-700 cursor-pointer"
          )}
        >
          <>
            {contact_type}
          </>
        </Badge>
      )
    }
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      
      return (
        <div
          className='items-start'
        >
          Cost
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </div>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue("cost") || false;

      return (
        <Badge className={cn(
          "bg-slate-500 flex gap-2 items-center w-16",
        )}>
          <>
            <h1>$</h1>
            {price}
          </>
        </Badge>
      )
    }
  },
  {
    accessorKey: "day",
    header: ({ column }) => {
      
      return (
        <div
          className='items-start'
        >
          status
        </div>
      )
    },
    cell: ({ row }) => {
      const day = row.getValue("day") || false;

      return (
        <h1 className={cn('')}>
          <>
            {day}
          </>
        </h1>
      )
    }
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      
      return (
        <div
          className='items-start'
        >
          status
        </div>
      )
    },
    cell: ({ row }) => {
      const time = row.getValue("time") || false;

      return (
        <h1 className={cn(
          "w-20 ")}>
          <>
            {time}
          </>
        </h1>
      )
    }
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          className='items-start'
        >
          Created At
        </div>
      )
    },
    cell: ({ row }) => {
      const created_at = row.getValue("created_at") || false;

      return (
        <>
        {created_at}
        </>
      )
    }
  },


]
