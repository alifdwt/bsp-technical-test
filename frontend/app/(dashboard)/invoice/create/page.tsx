import { Metadata } from "next";
import React, { Suspense } from "react";

import LoadingPage from "@/components/layout/LoadingPage";

import FireProductInvoice from "./_components/FireProductInvoice";

export const metadata: Metadata = {
  title: "Buat Faktur",
  description: "Halaman untuk membuat faktur",
};

export default function CreateInvoicePage({
  searchParams,
}: {
  searchParams: { type: string; id: string };
}) {
  const { type, id } = searchParams;

  if (!type || !id) {
    return (
      <div>
        <h2 className="h2-bold">Tidak ada data yang diterima</h2>
      </div>
    );
  }

  if (type === "product/fire") {
    return (
      <Suspense
        fallback={<LoadingPage message="Memuat faktur" />}
        key={Math.random()}
      >
        <FireProductInvoice id={id} />
      </Suspense>
    );
  }

  return (
    <div>
      <h2 className="h2-bold">Ini adalah halaman membuat invoice</h2>
      <p>
        Anda sedang membuat invoice untuk {type} dengan ID {id}
      </p>
    </div>
  );
}
