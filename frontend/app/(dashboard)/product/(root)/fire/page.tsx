import { Metadata } from "next";
import React, { Suspense } from "react";

import DatatableLoading from "@/components/datatable/DatatableLoading";

import FireProductDatatable from "./_components/FireProductDatatable";

export const metadata: Metadata = {
  title: "Produk Kebakaran",
  description: "Fire Product",
};

export default function FireProductPage() {
  return (
    <Suspense fallback={<DatatableLoading />} key={Math.random()}>
      <FireProductDatatable />
    </Suspense>
  );
}
