import React, { Suspense } from "react";

import FireProductDatatable from "./_components/FireProductDatatable";

import DatatableLoading from "@/components/datatable/DatatableLoading";

export default function FireProductPage() {
  return (
    <Suspense fallback={<DatatableLoading />} key={Math.random()}>
      <FireProductDatatable />
    </Suspense>
  );
}
