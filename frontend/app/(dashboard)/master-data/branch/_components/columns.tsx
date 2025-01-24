"use client";

import { ColumnDef } from "@tanstack/react-table";

import DatatableDeleteButton from "@/components/datatable/DeleteButton";
import DatatableEditButton from "@/components/datatable/EditButton";
import { IBranches } from "@/types/master-data/branch";

export const branchColumns: ColumnDef<IBranches>[] = [
  {
    accessorKey: "code",
    header: "Kode Cabang",
  },
  {
    accessorKey: "name",
    header: "Nama Cabang",
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex gap-2">
          <DatatableEditButton editLink={`/master-data/branch/edit/${id}`} />
          <DatatableDeleteButton deleteLink={`/branch`} id={String(id)} />
        </div>
      );
    },
  },
];
