import React, { useContext, useEffect, useState } from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Ban, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean, 
  isError: boolean,
}

export default function CooperationEmployeeDataTable<TData, TValue>({
  columns, 
  data,
  isLoading, 
  isError,

}: DataTableProps<TData, TValue> ) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    }
  })

  return (
    
    <div>
      <div className=" w-full flex items-center justify-between gap-4 pb-4">
        <div className='w-full flex items-center'>
          <h1 className=" text-cyan-600 font-bold">Cooperation Register Employees</h1>
        </div>
        <div className=' w-full flex items-end justify-end'>
          <Input
            placeholder="Filter employees..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>

      <div className="rounded-md border">
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                { isLoading ? 
                ( <div className=' w-full flex items-center justify-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <Loader2 className="mr-2 h-10 w-10 text-cyan-700 animate-spin" />
                      <h1>Loading data...</h1>
                    </div>
                  </div>
                ) : isError ? (
                  <div className='w-full flex items-center justify-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <Ban className="mr-2 h-10 w-10 text-rose-700" />
                      <h1>No services</h1>
                    </div>
                  </div>
                ) : (
                  <div className='w-full flex items-center justify-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <h1>No registered users</h1>
                    </div>
                  </div>
                )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
