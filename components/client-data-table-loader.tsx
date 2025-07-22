"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_ROWS = 80;
const SKELETON_COLS = 14; // 6 fixed + 8 tags

const ClientDataTableLoader = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="w-32">
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="w-20">
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <Table className="overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead className="border-l border-t text-center font-bold">No.</TableHead>
            <TableHead className="border-l border-t text-center font-bold">Client Name</TableHead>
            <TableHead className="border-l border-t text-center font-bold">Note/Link</TableHead>
            <TableHead className="border-l border-t text-center font-bold">Latest Tag</TableHead>
            <TableHead className="border-l border-t text-center font-bold min-w-25">Timer</TableHead>
            <TableHead className="border-l border-t text-center font-bold">Status</TableHead>
            {Array.from({ length: 8 }, (_, index) => (
              <TableHead key={index} className="border-l border-r-1 border-t text-center font-bold">
                Tag {index + 1}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: SKELETON_ROWS }).map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {Array.from({ length: SKELETON_COLS }).map((_, colIdx) => (
                <TableCell key={colIdx} className="border text-center">
                  <Skeleton className="h-6 w-full mx-auto" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default ClientDataTableLoader