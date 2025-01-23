import React, { Suspense } from "react";

import EditFormWrapper from "./_components/EditFormWrapper";

import LoadingPage from "@/components/layout/LoadingPage";

export default function EditBuildingTypePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div>
      <h1 className="text-xl font-semibold">Edit Jenis Bangunan</h1>
      <Suspense fallback={<LoadingPage message="Memuat formulir..." />}>
        <EditFormWrapper id={id} />
      </Suspense>
    </div>
  );
}
