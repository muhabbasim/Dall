"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown} from "lucide-react"
import { Button } from "@/components/ui/button";


import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@radix-ui/react-checkbox";
import ExamCompletionDynamic from "../_components/ExamCompletionDynamic";
import Link from "next/link";



export type Exam = {
  id: number;
  status: string
  isCompleted: Boolean
  isStarted: Boolean
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "type",
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
          "bg-slate-500 w-36 flex items-center justify-center",
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
    accessorKey: "isStarted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-start justify-start"
        >
          Completion
        </Button>
      )
    },
    cell: ({ row }) => {
      const isStarted: boolean = row.getValue("isStarted");
      const status: 'paid' | 'waiting-for-payment' | 'failed' = row.getValue("status");
      const examId: number = row.getValue("id");
      const isCompleted: boolean = row.getValue("isCompleted");
      // const router = useRouter();

      return (
        <ExamCompletionDynamic isStarted={isStarted} status={status} examId={examId} isCompleted={isCompleted}/>
      )
    }
  },
  {
    accessorKey: "isCompleted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Result
        </Button>
      )
    },
    cell: ({ row }) => {
      const isCompleted = row.getValue("isCompleted");
      const examId: number = row.getValue("id");

      return (
        <Badge 
          className={cn(
            "bg-slate-500 cursor-pointer",
            isCompleted! ? "bg-sky-700" : 'opacity-0'
          )}
        >
          <Link href={`/individual/results/${examId}`}>
            {isCompleted ? "Result" : ""}
          </Link>
        </Badge>
      )
    }
  },

]
