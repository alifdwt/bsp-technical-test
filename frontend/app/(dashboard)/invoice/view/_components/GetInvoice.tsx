import React from "react";

import InvoiceTable from "../../_components/InvoiceTable";

import { getInvoiceByCode } from "@/lib/api/invoice";
import { getSession } from "@/lib/auth/session";

const GetInvoice = async ({ code }: { code: string }) => {
  const session = await getSession();
  if (!session) {
    throw new Error("401 - Unauthorized");
  }

  const res = await getInvoiceByCode(session.accessToken, code);
  if (res.statusCode !== 200 || !res.data) {
    throw new Error(res.message);
  }

  const invoice = res.data;

  return (
    <InvoiceTable
      invoiceType={
        invoice?.fire_product_id ? "Asuransi Kebakaran" : "Asuransi Apalah"
      }
      buildingType={invoice.fire_product.building_type.name}
      invoiceCode={invoice.code}
      period={invoice.fire_product.period}
      extension={
        invoice.fire_product.is_earthquake ? "Gempa Bumi" : "Tidak ada"
      }
      insuredPrice={invoice.insured_price}
      premiumRate={invoice.premium_rate}
      premiumBase={invoice.premium_base}
      transactionFee={invoice.transaction_fee}
      total={invoice.total}
    />
  );
};

export default GetInvoice;
