import React, { Suspense } from "react";

import EditBranchFormWrapper from "./_components/FormWrapper";

import LoadingPage from "@/components/layout/LoadingPage";

export default function EditBranchPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <h2>Edit Cabang</h2>
      <Suspense
        fallback={<LoadingPage message="Memuat formulir" />}
        key={Math.random()}
      >
        <EditBranchFormWrapper id={id} />
      </Suspense>
    </div>
  );
}
