import React, { Suspense } from "react";

import GetInvoice from "@/app/(dashboard)/invoice/view/_components/GetInvoice";
import LoadingPage from "@/components/layout/LoadingPage";
import { getBuildingTypes } from "@/lib/api/master-data/building-type";
import { getFireProduct } from "@/lib/api/product/fire";
import { getSession } from "@/lib/auth/session";

import FireProductForm from "../../../_components/FireProductForm";

const DetailSection = async ({ id }: { id: string }) => {
  const session = await getSession();
  if (!session) {
    throw new Error("401 - Unauthorized");
  }

  const buildingTypes = await getBuildingTypes(session.accessToken);
  if (buildingTypes.statusCode !== 200 || !buildingTypes.data) {
    throw new Error("Building Types data not found");
  }

  const res = await getFireProduct(id, session.accessToken);
  if (res.statusCode !== 200 || !res.data) {
    throw new Error(res.message);
  }

  const product = res.data;

  async function renderInvoice() {
    if (!product.invoice_code) {
      return null;
    }

    return (
      <div className="mb-4 border-b-4 border-gray-200 pb-4">
        {/* <h3>Faktur</h3> */}
        <Suspense
          fallback={<LoadingPage message="Memuat faktur..." />}
          key={Math.random()}
        >
          <GetInvoice code={product.invoice_code} />
        </Suspense>
      </div>
    );
  }

  return (
    <div>
      {renderInvoice()}
      <FireProductForm
        actionType="detail"
        session={session}
        buildingTypes={buildingTypes.data}
        data={product}
      />
    </div>
  );
};

export default DetailSection;
