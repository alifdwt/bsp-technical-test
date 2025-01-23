import React from "react";

import BuildingTypeForm from "../_components/forms/BuildingTypeForm";

import { getSession } from "@/lib/auth/session";

export default async function AddBuildingTypePage() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Tambah Jenis Bangunan</h1>
      <BuildingTypeForm formType="add" token={session.accessToken} />
    </div>
  );
}
