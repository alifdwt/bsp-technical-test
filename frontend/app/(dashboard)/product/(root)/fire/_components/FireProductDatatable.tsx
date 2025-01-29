import React from "react";

import { adminFireProductColumns } from "./admin-columns";
import { fireProductColumns } from "./columns";

import DataTable from "@/components/datatable/DataTable";
import { getFireProducts } from "@/lib/api/product/fire";
import { getSession } from "@/lib/auth/session";

const FireProductDatatable = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("401 - Session is unavailable");
  }

  const fireProducts = await getFireProducts(session.accessToken);
  if (fireProducts.statusCode !== 200 || !fireProducts.data) {
    throw new Error(fireProducts.message);
  }

  const data = fireProducts.data;

  return (
    <DataTable
      columns={
        session.user.role === "admin"
          ? adminFireProductColumns
          : fireProductColumns
      }
      data={data}
    />
  );
};

export default FireProductDatatable;
