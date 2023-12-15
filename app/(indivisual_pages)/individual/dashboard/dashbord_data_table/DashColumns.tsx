"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown} from "lucide-react"
import { Button } from "@/components/ui/button";


import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@radix-ui/react-checkbox";



export type Exam = {
  id: number;
  status: string
  isCompleted: Boolean
  isStarted: Boolean
  created_at: Date;
}

const handleReult = () => {
  console.log('result')
}

const handleExam = (isStarted: boolean, status: string) => {
  
  if (isStarted) {
    console.log('Continue')
    return;
  }
  if (!isStarted) {
    // router.push('/individual/exams')
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
    accessorKey: "isStarted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Completion
        </Button>
      )
    },
    cell: ({ row }) => {
      const isStarted: boolean = row.getValue("isStarted");
      const status: string = row.getValue("status");
      // const router = useRouter();

      return (
        <Badge 
        onClick={() => handleExam(isStarted, status)}
          className={cn(
            "bg-slate-500 cursor-pointer",
            isStarted && "bg-sky-700",
            status === 'waiting-for-payment' && 'opacity-0',
            status === 'failed' && 'opacity-0'
          )}
        >
          {status === 'paid' && !isStarted && "Start"}
          {status === 'paid' && isStarted && "Continue"}
        </Badge>
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

      return (
        <Badge 
          onClick={handleReult}
          className={cn(
            "bg-slate-500 cursor-pointer",
            isCompleted! ? "bg-sky-700" : 'opacity-0'
          )}
        >
          {isCompleted ? "Result" : ""}
        </Badge>
      )
    }
  },

]
