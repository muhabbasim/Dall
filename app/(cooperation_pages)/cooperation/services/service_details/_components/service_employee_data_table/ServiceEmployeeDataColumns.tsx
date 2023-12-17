"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Check, Eye, X } from "lucide-react"
import { 
  Dialog as UserDialog,
  DialogContent as UserDialogContent,
  DialogTrigger as UserDialogTrigger,
} from "@/app/(cooperation_pages)/cooperation/employees/_components/userDetailsDialog";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import EmployeeDetails from "@/app/(cooperation_pages)/cooperation/employees/_components/EmployeeDetails";
import ServiceDialog from "../ServiceDialog";

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
    accessorKey: "verification",
    header: ({ column }) => {
      return (
        <div
          className="items-start w-28"
        >
          Verification
        </div>
      )
    },
    cell: ({ row }) => {
      const verification = row.getValue("verification") || false;
      const id = row.getValue("id") || false;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <h1 
              className={cn(
                "text-teal-700 w-full flex items-center gap-2 cursor-pointer",
                !verification && 'text-rose-800'
              )}
            >
              {verification ? (
                <Check className="w-4 h-4"/>
              ) : (
                <X className="w-4 h-4"/>
              )}
              {verification ? "Confirmed" : "Not confirmed"}
            </h1>
          </DialogTrigger>
          <ServiceDialog verification={verification} id={id}/>
        </Dialog>
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
  
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <div
          className=""
        >
          Action
        </div>
      )
    },
    cell: ({ row }) => {
      const userId = row.getValue('id')
      return (
        <UserDialog>
          <UserDialogTrigger asChild>
            <div className="flex cursor-pointer gap-3">
              <Eye className=" text-rose-800"/>
            </div>
          </UserDialogTrigger>
          <UserDialogContent className="sm:max-w-md">
            <div className="">
              <EmployeeDetails userId={userId}/>
            </div>
          </UserDialogContent>
        </UserDialog>
      )
    }
  }
]
