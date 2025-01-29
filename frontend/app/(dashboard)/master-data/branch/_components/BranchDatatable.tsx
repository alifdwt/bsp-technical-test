import React from "react";

import DataTable from "@/components/datatable/DataTable";
import { getBranches } from "@/lib/api/master-data/branch";
import { getSession } from "@/lib/auth/session";

import { branchColumns } from "./columns";

const BranchDatatable = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("401 - Session is unavailable");
  }

  const branches = await getBranches(session.accessToken);
  if (branches.statusCode !== 200 || !branches.data) {
    throw new Error(branches.message);
  }

  const data = Array.isArray(branches.data) ? branches.data : [];

  return (
    <DataTable
      columns={branchColumns}
      data={data}
      addLink="/master-data/branch/add"
    />
  );
};

export default BranchDatatable;
