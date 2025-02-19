"use client";

import * as React from "react";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable({ data, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full text-white border border-stone-700 overflow-hidden rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Clicks by location</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="text-white">
            <TableRow className="border-none hover:!bg-transparent hover:!text-inherit hover:!shadow-none hover:!border-none">
              <TableHead className="text-start text-base text-white">
                #
              </TableHead>
              <TableHead className="text-start text-base text-white">
                Country
              </TableHead>
              <TableHead className="text-end text-base text-white">
                Total Clicks
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-none hover:!bg-transparent hover:!text-inherit hover:!shadow-none hover:!border-none"
                >
                  <TableCell className="border-none py-4 hover:bg-transparent text-start text-white font-bold">
                    {rowIndex + 1}
                  </TableCell>
                  <TableCell className="border-none py-4 hover:bg-transparent text-start text-white font-bold">
                    {row.country}
                  </TableCell>
                  <TableCell className="border-none py-4 hover:bg-transparent text-end text-white font-bold">
                    {row.totalClicks}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 pt-2">
          <div className="space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
