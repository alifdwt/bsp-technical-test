"use client";

import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { translateRouteToIndonesian } from "@/lib/translate";

export default function ErrorPage({
  error,
  reset,
  module,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  module: string;
}) {
  const router = useRouter();
  function refreshAndReset() {
    startTransition(() => {
      router.refresh();
      console.log("page is refreshed");
      reset();
    });
  }

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-slate-200 p-2">
      <CircleAlert className="mx-auto size-24 text-red-600" />
      <p className="text-center text-red-600">
        Gagal memuat {translateRouteToIndonesian(module)}
      </p>
      <div className="flex gap-2">
        <Button onClick={refreshAndReset} variant={"destructive"}>
          Muat Ulang
        </Button>
        <Button asChild variant={"outline"}>
          <Link href="/api/auth/signout">Keluar</Link>
        </Button>
      </div>
      {!error.message.includes("Server Components") && (
        <p className="text-center text-xs text-gray-500">
          Error: {error.message}
        </p>
      )}
    </div>
  );
}
