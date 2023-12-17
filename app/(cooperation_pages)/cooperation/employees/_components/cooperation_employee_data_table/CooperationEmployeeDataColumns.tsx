"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../userDetailsDialog"
import EmployeeDetails from "../EmployeeDetails";

type individualsProps = {
  name: string;
  email: string;
  image: string;
  phone: string;
  verification: boolean;
  is_verified: boolean;
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
    id: "action",
    header: ({ column }) => {
      return (
        <div
          className="w-20 flex justify-center"
        >
          Action
        </div>
      )
    },
    cell: ({ row }) => {
      const userId = row.getValue('id')
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-center cursor-pointer gap-3">
              {/* <h1>
                Details
              </h1> */}
              <Eye className=" text-rose-800"/>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="">
              <EmployeeDetails userId={userId}/>
            </div>
          </DialogContent>
        </Dialog>
      )
    }
  },
]
