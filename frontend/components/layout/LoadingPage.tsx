import { Loader2Icon } from "lucide-react";
import React from "react";

export default function LoadingPage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">{message}</h2>
      <Loader2Icon className="text-primary size-24 animate-spin" />
    </div>
  );
}
