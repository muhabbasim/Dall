"use client"

// import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
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
import { useRouter } from "next/navigation";
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

const handleReult = () => {
  console.log('result')
}

const handleExam = (isStarted: boolean, status: string, router: any) => {
  
  if (isStarted) {
    console.log('Continue')
    return;
  }
  if (!isStarted) {
    router.push('/individual/exams')
    console.log('Start')
    return;
  }
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Exam type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          status
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
    cell: ({ row }) => {
      const isSucess = row.getValue("status") || false;

      return (
        <Badge className={cn(
          "bg-slate-500 ",
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
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
        </Button>
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
  {
    accessorKey: "contact_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Contact type
        </Button>
      )
    },
    cell: ({ row }) => {
      const contact_type = row.getValue("contact_type");

      return (
        <Badge 
          onClick={handleReult}
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
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-4 p-0">
              <span className="sr-only">Open menu</span> 
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>

            <Link href={``}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit
              </DropdownMenuItem>
            </Link>
           
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
