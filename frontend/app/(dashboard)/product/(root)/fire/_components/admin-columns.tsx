"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IFireProducts } from "@/types/product/fire";

import PolicyButton from "./PolicyButton";

export const adminFireProductColumns: ColumnDef<IFireProducts>[] = [
  // TODO: policy_number, insured_type,, invoice_number, payment_status, details
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "policy_code",
    header: "No. Polis",
    cell: ({ row }) => {
      if (row.original.invoice_code) {
        return (
          <PolicyButton
            policyCode={row.original.policy_code}
            invoiceCode={row.original.invoice_code}
          />
        );
      } else {
        return "Belum terbit";
      }
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
      switch (row.original.invoice_code) {
        case "":
          return (
            <Button asChild>
              <Link
                href={`/invoice/create?type=product/fire&id=${row.original.id}`}
              >
                Buat Faktur
              </Link>
            </Button>
          );
        case "payment-sent":
          return (
            <p className="font-semibold text-yellow-500">
              Menunggu konfirmasi admin
            </p>
          );
        default:
          return (
            <Link
              href={`/invoice/view?code=${row.original.invoice_code}`}
              className="font-semibold text-primary hover:underline"
            >
              {row.original.invoice_code}
            </Link>
          );
      }
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const isPaidByUser = row.original.invoice_code !== "";
      const isPaidByAdmin =
        row.original.invoice_code !== "" && row.original.policy_code !== "";

      if (isPaidByAdmin) {
        return "Sudah Dibayar";
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
