"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Button onClick={() => reset()}>Reset</Button>
      <Button asChild variant={"outline"}>
        <Link href="/dashboard/profile">Profil</Link>
      </Button>
      <Button asChild variant={"destructive"}>
        <Link href="/api/auth/signout">Keluar</Link>
      </Button>
    </>
  );
}
