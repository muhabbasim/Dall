"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input2 } from "@/components/ui/input2"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    name: "Success Croogo",
    image: 'https://images.unsplash.com/photo-1565018968320-16492baa0056?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    email: "ken9@yahoo.com",
    isConfirmed: false
  },
  {
    id: "3u1reuv4",
    name: "Erick Garcia",
    image: "https://images.unsplash.com/photo-1480577902672-87c928766a22?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "Abe4@gmail.com",
    isConfirmed: true
  },
  {
    id: "derv1ws0",
    name: "Jone week",
    image: "https://images.unsplash.com/photo-1467664631004-58beab1ece0d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "Mon@gmail.com",
    isConfirmed: true
  },
  {
    id: "5kma53ae",
    name: "Khalid Husam",
    image: "https://images.unsplash.com/photo-1560257855-218d43089d86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "Sis22@gmail.com", 
    isConfirmed: false
  },
  {
    id: "bhqecj4p",
    name: "Nuha Esa",
    image: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "car@hotmail.com",
    isConfirmed: true
  },
]

export type Payment = {
  id: string
  name: string
  image: string
  email: string
  isConfirmed: boolean
}

export const columns: ColumnDef<Payment>[] = [


  
  {
    accessorKey: "name",
    header: "Assigned employee",
    cell: ({ row }) => {
  
      const name: string = row.getValue("name");
      const item = data.find((item) => item.name === name);

      if (item) {
        return (
          <div className="flex gap-3">
            <div>
              <img className="w-10 h-10 rounded-full object-cover" src={item.image} alt="personal image" />
            </div>
            <div>
              <div className="">
                <h1 className=" text-xs text-gray-600">
                  {item.name}
                </h1>
              </div>
              <div className="">
                <h1 className="text-xs text-gray-400">
                  {item.email}
                </h1>
              </div>
            </div>
          </div>
        );
      }
    } 
    
  },

  {
    accessorKey: "isConfirmed",
    header: "",
    cell: ({ row }) => {
      const isConfirmed = row.getValue("isConfirmed") || false;
      return (
        <div className="flex justify-start items-center">
          {
            isConfirmed ?
            (
              <div 
                className={cn(
                  "cursor-pointer flex items-center justify-center gap-2",
                )}
              >
                <div className=" bg-cyan-500 rounded-full w-2 h-2"></div>
                <span className="text-xs">
                  Confirmed
                </span>
              </div>
            ) : (
              <div 
                className={cn(
                  " cursor-pointer flex items-center justify-center gap-2",
                )}
              >
                <div className="bg-rose-700 rounded-full w-2 h-2"></div>
                <span className="text-xs">
                  Waiting
                </span>
              </div>

            )
          }
        </div>
      )
    } 
  },

]

export function EmployeesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className='border p-4 rounded-lg shadow-sm'>
      <div className="w-full">
        <div className="flex items-center px-2 border rounded-lg">
          <Search className="text-gray-400"/>

          <Input2
            placeholder="Filter emails..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
    
        </div>
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No Data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
  
      </div>
    </div>
  )
}
