import React, { Suspense } from "react";

import DatatableLoading from "@/components/datatable/DatatableLoading";

import BuildingTypeDatatable from "./_components/BuildingTypeDatatable";

export default function BuildingTypePage() {
  return (
    <Suspense fallback={<DatatableLoading />} key={Math.random()}>
      <BuildingTypeDatatable />
    </Suspense>
  );
}
