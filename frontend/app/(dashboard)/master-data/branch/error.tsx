"use client";

import React from "react";

import ErrorPage from "@/components/error/ErrorPage";

export default function BranchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} module="building-type" />;
}
