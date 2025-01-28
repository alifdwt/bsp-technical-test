import React, { Suspense } from "react";

import GetInvoice from "./_components/GetInvoice";

import LoadingPage from "@/components/layout/LoadingPage";

export default function ViewInvoicePage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const { code } = searchParams;

  if (!code) {
    throw new Error("Tidak ada data yang diterima");
  }

  return (
    <Suspense
      fallback={<LoadingPage message="Memuat faktur" />}
      key={Math.random()}
    >
      <GetInvoice code={code} />
    </Suspense>
  );
}
