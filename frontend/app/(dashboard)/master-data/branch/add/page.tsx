import React from "react";

import { getSession } from "@/lib/auth/session";

import BranchForm from "../_components/form/BranchForm";

export default async function AddBranchPage() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Tambah Cabang</h1>
      <BranchForm formType="add" token={session.accessToken} />
    </div>
  );
}
