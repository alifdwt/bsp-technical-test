import React, { Suspense } from "react";

import GetInvoice from "@/app/(dashboard)/invoice/view/_components/GetInvoice";
import LoadingPage from "@/components/layout/LoadingPage";
import { ModalIntercept } from "@/components/ui/modal";

export default function ViewInvoiceProductPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const { code } = searchParams;

  if (!code) {
    throw new Error("Tidak ada data yang diterima");
  }

  return (
    <ModalIntercept>
      <div className="w-[65vw]">
        <Suspense
          fallback={<LoadingPage message="Memuat faktur" />}
          key={Math.random()}
        >
          <GetInvoice code={code} />
        </Suspense>
      </div>
    </ModalIntercept>
  );
}
