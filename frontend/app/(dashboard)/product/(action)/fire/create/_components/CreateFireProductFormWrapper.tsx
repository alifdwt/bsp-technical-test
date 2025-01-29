import React from "react";

import FireProductForm from "../../_components/FireProductForm";

import { getBuildingTypes } from "@/lib/api/master-data/building-type";
import { getSession } from "@/lib/auth/session";

const CreateFireProductFormWrapper = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "customer") {
    throw new Error("You are not authorized to access this page");
  }

  const buildingTypes = await getBuildingTypes(session.accessToken);
  if (buildingTypes.statusCode !== 200 || !buildingTypes.data) {
    throw new Error("Building Types data not found");
  }

  return (
    <FireProductForm
      actionType="create"
      session={session}
      buildingTypes={buildingTypes.data}
    />
  );
};

export default CreateFireProductFormWrapper;
