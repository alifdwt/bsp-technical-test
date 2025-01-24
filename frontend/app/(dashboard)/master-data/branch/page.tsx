import React, { Suspense } from "react";

import BranchDatatable from "./_components/BranchDatatable";

import DatatableLoading from "@/components/datatable/DatatableLoading";

export default function BranchPage() {
  return (
    <Suspense fallback={<DatatableLoading />} key={Math.random()}>
      <BranchDatatable />
    </Suspense>
  );
}
