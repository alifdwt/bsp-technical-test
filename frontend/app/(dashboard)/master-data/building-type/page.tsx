import React, { Suspense } from "react";

import BuildingTypeDatatable from "./_components/BuildingTypeDatatable";

import DatatableLoading from "@/components/datatable/DatatableLoading";

export default function BuildingTypePage() {
  return (
    <Suspense fallback={<DatatableLoading />} key={Math.random()}>
      <BuildingTypeDatatable />
    </Suspense>
  );
}
