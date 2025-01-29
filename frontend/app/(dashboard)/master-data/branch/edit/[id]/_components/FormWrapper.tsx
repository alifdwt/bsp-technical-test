import React from "react";

import { getBranch } from "@/lib/api/master-data/branch";
import { getSession } from "@/lib/auth/session";

import BranchForm from "../../../_components/form/BranchForm";

const EditBranchFormWrapper = async ({ id }: { id: string }) => {
  const session = await getSession();
  if (!session) {
    throw new Error("401 - Session is unavailable");
  }

  const branch = await getBranch(id, session.accessToken);
  if (branch.statusCode !== 200 || !branch.data) {
    throw new Error(branch.message);
  }

  return (
    <BranchForm
      formType="edit"
      token={session.accessToken}
      data={branch.data}
    />
  );
};

export default EditBranchFormWrapper;
