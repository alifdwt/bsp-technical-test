"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IFireProducts } from "@/types/product/fire";

export const fireProductColumns: ColumnDef<IFireProducts>[] = [
  // TODO: policy_number, insured_type,, invoice_number, payment_status, details
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "policy_code",
    header: "No. Polis",
    cell: ({ row }) => {
      return row.original.policy_code || "Belum terbit";
    },
  },
  {
    header: "Jenis Penanggungan",
    cell: () => {
      return "Asuransi Kebakaran";
    },
  },
  {
    accessorKey: "invoice_code",
    header: "No. Invoice",
    cell: ({ row }) => {
      return row.original.invoice_code || "Belum terbit";
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const isPaidByUser = row.original.invoice_code !== "";
      const isPaidByAdmin =
        row.original.invoice_code !== "" && row.original.policy_code !== "";

      if (isPaidByAdmin) {
        return "Dibayar";
      } else if (isPaidByUser) {
        return "Menunggu Konfirmasi Admin";
      } else {
        return "Belum Dibayar";
      }
    },
  },
  {
    // accessorKey: "",
    header: "Actions",
    cell: ({ row }) => (
      <Button asChild>
        <Link href={`/product/fire/detail/${row.original.id}`}>Detail</Link>
      </Button>
    ),
  },
];
