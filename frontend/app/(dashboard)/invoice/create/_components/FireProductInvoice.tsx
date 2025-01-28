import Link from "next/link";
import React from "react";

import PayButton from "./PayButton";
import InvoiceTable from "../../_components/InvoiceTable";

import { Button } from "@/components/ui/button";
import { getNextInvoiceCode } from "@/lib/api/invoice";
import { getFireProduct } from "@/lib/api/product/fire";
import { getSession } from "@/lib/auth/session";
import { calculateFireProductPremiumBase } from "@/lib/calculation/invoice/fire-product";

const FireProductInvoice = async ({ id }: { id: string }) => {
  // wait 5 seconds
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const session = await getSession();
  if (!session) {
    throw new Error("401 - Unauthorized");
  }

  const res = await getFireProduct(id, session.accessToken);
  if (res.statusCode !== 200 || !res.data) {
    console.error("Error while fetching fire product", res);
    throw new Error(res.message);
  }

  const { data: fireProduct } = res;

  // if (fireProduct.invoice_code) {
  //   return (
  //     <div>
  //       <h2 className="h2-bold">Faktur sudah terbit</h2>
  //       <p>
  //         Faktur dengan nomor invoice {fireProduct.invoice_code} sudah terbit.
  //       </p>
  //     </div>
  //   );
  // }

  const nextInvoiceCodeRes = await getNextInvoiceCode(session.accessToken);
  if (nextInvoiceCodeRes.statusCode !== 200 || !nextInvoiceCodeRes.data) {
    console.error("Error while fetching next invoice code", nextInvoiceCodeRes);
    throw new Error(nextInvoiceCodeRes.message);
  }

  const nextInvoiceCode = nextInvoiceCodeRes.data;

  const transactionFee = 10000; // 10.000 IDR

  const premiumBase = calculateFireProductPremiumBase(
    fireProduct.price,
    fireProduct.building_type.rate,
    true,
    fireProduct.period
  );

  const total = premiumBase + transactionFee;

  return (
    <>
      <InvoiceTable
        invoiceType="Asuransi Kebakaran"
        buildingType={fireProduct.building_type.name}
        invoiceCode={nextInvoiceCode}
        period={fireProduct.period}
        extension={fireProduct.is_earthquake ? "Gempa Bumi" : "-"}
        insuredPrice={fireProduct.price}
        premiumRate={fireProduct.building_type.rate}
        premiumBase={premiumBase}
        transactionFee={transactionFee}
        total={total}
      />

      <div className="flex justify-end gap-4">
        <Button variant={"outline"} asChild className="rounded-full bg-white">
          <Link href="/product/fire">Kembali ke halaman produk</Link>
        </Button>
        <PayButton
          token={session.accessToken}
          id={fireProduct.id}
          insuredPrice={fireProduct.price}
          period={fireProduct.period}
          premiumRate={fireProduct.building_type.rate}
          premiumBase={premiumBase}
          transactionFee={transactionFee}
          total={total}
          tag="product/fire"
        />
      </div>
    </>
  );
};

export default FireProductInvoice;
