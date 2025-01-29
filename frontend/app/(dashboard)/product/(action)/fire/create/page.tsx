import { Metadata } from "next";
import React, { Suspense } from "react";

import LoadingPage from "@/components/layout/LoadingPage";
import PageHeader from "@/components/layout/PageHeader";

import CreateFireProductFormWrapper from "./_components/CreateFireProductFormWrapper";

export const metadata: Metadata = {
  title: "Pengajuan Klaim Kebakaran",
};

export default function CreateFireProductPage() {
  return (
    <div className="space-y-4">
      <PageHeader title={"Pengajuan Klaim Kebakaran"} description={""} />

      <div className="max-w-[96vw] rounded-xl border bg-white p-4 shadow">
        <Suspense fallback={<LoadingPage />} key={Math.random()}>
          <CreateFireProductFormWrapper />
        </Suspense>
      </div>
    </div>
  );
}
