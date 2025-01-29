import React, { Suspense } from "react";

import LoadingPage from "@/components/layout/LoadingPage";

import DetailSection from "./_components/DetailSection";

export default function FireProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="space-y-4">
      <div className="max-w-[96vw] rounded-xl border bg-white p-4 shadow">
        <Suspense
          fallback={<LoadingPage message="Memuat detail..." />}
          key={Math.random()}
        >
          <DetailSection id={id} />
        </Suspense>
      </div>
    </div>
  );
}
