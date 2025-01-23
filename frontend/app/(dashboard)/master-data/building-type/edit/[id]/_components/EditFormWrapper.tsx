import React from "react";

import BuildingTypeForm from "../../../_components/forms/BuildingTypeForm";

import { getBuildingType } from "@/lib/api/master-data/building-type";
import { getSession } from "@/lib/auth/session";

const EditFormWrapper = async ({ id }: { id: string }) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const buildingType = await getBuildingType(id, session.accessToken);
  if (buildingType.statusCode !== 200 || !buildingType.data) {
    throw new Error("Data not found");
  }

  //   wait 5 seconds
  //   await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <BuildingTypeForm
      formType="edit"
      token={session.accessToken}
      data={buildingType.data}
    />
  );
};

export default EditFormWrapper;
