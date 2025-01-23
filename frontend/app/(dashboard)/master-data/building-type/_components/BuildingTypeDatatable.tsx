import React from "react";

import { buildingTypeColumns } from "./columns";

import DataTable from "@/components/datatable/DataTable";
import { getBuildingTypes } from "@/lib/api/master-data/building-type";
import { getSession } from "@/lib/auth/session";

const BuildingTypeDatatable = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("401 - Session is unavailable");
  }

  const buildingTypes = await getBuildingTypes(session.accessToken);

  if (buildingTypes.statusCode !== 200 || !buildingTypes.data) {
    throw new Error(buildingTypes.message);
  }

  const data = Array.isArray(buildingTypes.data) ? buildingTypes.data : [];

  return (
    <DataTable
      columns={buildingTypeColumns}
      data={data}
      addLink="/master-data/building-type/add"
    />
  );
};

export default BuildingTypeDatatable;
