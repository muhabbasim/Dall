"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import HandleDetils from "../HandleDetils";



export type Service = {
  id: number;
  type: string;
  nubmer_seats: number;
  random_strings: string;
  status: string
  start_date: Date;
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
        <div 
          className={cn(
            "w-20 flex items-center gap-2"
          )}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full"/>

          <>
            {seats}
          </>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          className="items-start w-40"
        >
          Status
        </div>
      )
    },
    cell: ({ row }) => {
      const isSucess = row.getValue("status") || false;

      return (
        <div className={cn(
          " flex gap-2 items-center ")}>
          <div className={cn(
          "bg-slate-500 w-2 h-2 flex items-center justify-center rounded-full",
          isSucess === 'paid' && "bg-sky-700",
          isSucess === 'failed' && "bg-rose-900",
        )}/>

          <>
            {isSucess}
          </>
        </div>
      )
    }
  },
  
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <div
        >
          Action
        </div>
      )
    },
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      const dispatch = useDispatch()
      return (
        <div className="flex items-center justify-center">
          <HandleDetils id={id}/>
        </div>

      )
    }
  }
]
