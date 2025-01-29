import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoiceTableProps {
  invoiceType: string;
  buildingType: string;
  invoiceCode: string;
  period: number;
  extension: string;
  insuredPrice: number;
  premiumRate: number;
  premiumBase: number;
  transactionFee: number;
  total: number;
}

const InvoiceTable = ({
  invoiceType,
  buildingType,
  invoiceCode,
  period,
  extension,
  insuredPrice,
  premiumRate,
  premiumBase,
  transactionFee,
  total,
}: InvoiceTableProps) => {
  return (
    <Table className="border-2 bg-white">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow className="*:p-4">
          <TableHead className="">Premi Terbaik</TableHead>
          <TableHead>Periode</TableHead>
          <TableHead>Perluasan</TableHead>
          <TableHead>Harga Bangunan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="*:p-4">
          <TableCell>
            <div>
              <h3 className="">{invoiceType}</h3>
              <p className="text-xs text-gray-500">{buildingType}</p>
              <p className="font-semibold">No. Invoice: {invoiceCode}</p>
            </div>
          </TableCell>
          <TableCell>{period} Tahun</TableCell>
          <TableCell>{extension}</TableCell>
          <TableCell>
            {new Intl.NumberFormat("id-ID", {
              currency: "IDR",
              style: "currency",
            }).format(insuredPrice)}
          </TableCell>
        </TableRow>
        <TableRow className="divide-x-2">
          <TableCell colSpan={2} className="text-transparent hover:text-black">
            Rate: {premiumRate}
          </TableCell>
          <TableCell colSpan={2} className="p-6">
            <div className="flex justify-between">
              <p>Premi Dasar</p>
              <p className="font-semibold">
                {new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(premiumBase)}
              </p>
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="divide-x-2">
          <TableCell colSpan={2}></TableCell>
          <TableCell colSpan={2} className="p-6">
            <div className="flex justify-between">
              <p>Biaya Transaksi</p>
              <p className="font-semibold">
                {new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(transactionFee)}
              </p>
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="divide-x-2">
          <TableCell colSpan={2}></TableCell>
          <TableCell colSpan={2} className="p-6">
            <div className="flex justify-between">
              <p>Total</p>
              <p className="font-semibold">
                {new Intl.NumberFormat("id-ID", {
                  currency: "IDR",
                  style: "currency",
                }).format(total)}
              </p>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;
