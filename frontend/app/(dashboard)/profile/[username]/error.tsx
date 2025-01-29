"use client";

import React from "react";

import ErrorPage from "@/components/error/ErrorPage";

export default function ProfileUsernameError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} module="profile" />;
}
