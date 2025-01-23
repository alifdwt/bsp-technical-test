"use client";

import { ColumnDef } from "@tanstack/react-table";

import DatatableDeleteButton from "@/components/datatable/DeleteButton";
import DatatableEditButton from "@/components/datatable/EditButton";
import { IBuildingTypes } from "@/types/master-data/building-type";

export const buildingTypeColumns: ColumnDef<IBuildingTypes>[] = [
  {
    accessorKey: "code",
    header: "Kode Bangunan",
  },
  {
    accessorKey: "name",
    header: "Nama Bangunan",
  },
  {
    accessorKey: "rate",
    header: "Tarif",
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex gap-2">
          <DatatableEditButton
            editLink={`/master-data/building-type/edit/${id}`}
          />
          <DatatableDeleteButton deleteLink={`/buildingtype`} id={String(id)} />
        </div>
      );
    },
  },
];
