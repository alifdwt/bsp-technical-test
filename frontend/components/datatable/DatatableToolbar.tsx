import { Table } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";

import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  addLink?: string;
}

export function DatatableToolbar<TData>({
  table,
  addLink,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>

      <div className="flex items-center space-x-2">
        {addLink && (
          <Button asChild>
            <Link href={addLink}>Tambah Data</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default DatatableToolbar;
