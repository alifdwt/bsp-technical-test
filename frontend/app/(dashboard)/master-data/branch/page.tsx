import React, { Suspense } from "react";

import DatatableLoading from "@/components/datatable/DatatableLoading";

import BranchDatatable from "./_components/BranchDatatable";

export default function BranchPage() {
  return (
    <Suspense fallback={<DatatableLoading />} key={Math.random()}>
      <BranchDatatable />
    </Suspense>
  );
}
