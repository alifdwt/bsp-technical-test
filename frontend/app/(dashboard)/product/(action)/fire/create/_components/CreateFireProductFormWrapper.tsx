import React from "react";

import FireProductForm from "./FireProductForm";

import { getBuildingTypes } from "@/lib/api/master-data/building-type";
import { getSession } from "@/lib/auth/session";

const CreateFireProductFormWrapper = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const buildingTypes = await getBuildingTypes(session.accessToken);
  if (buildingTypes.statusCode !== 200 || !buildingTypes.data) {
    throw new Error("Building Types data not found");
  }

  return (
    <FireProductForm
      token={session.accessToken}
      buildingTypes={buildingTypes.data}
    />
  );
};

export default CreateFireProductFormWrapper;
