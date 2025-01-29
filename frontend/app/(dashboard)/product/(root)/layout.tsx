import React from "react";

import PageHeader from "@/components/layout/PageHeader";
import { products } from "@/constants/product";
import { getSession } from "@/lib/auth/session";

import ProductTabs from "./_components/ProductTabs";

export default async function ProductRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    throw new Error("401 - Unauthorized");
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title={"Produk"}
        description={
          <>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequatur blanditiis atque nihil commodi ab repudiandae deserunt
            debitis quam. Assumenda officia doloribus necessitatibus deserunt
            cumque sequi, voluptate repellendus, aperiam expedita ipsam
            consequuntur fugit tempore. Unde voluptate, possimus molestiae
            asperiores nam sequi! Saepe odit, nihil recusandae vitae expedita
            itaque neque explicabo deserunt.
          </>
        }
      />

      <ProductTabs products={products} role={session.user.role} />
      <div className="max-w-[96vw] rounded-xl border bg-white p-4 shadow">
        {children}
      </div>
    </div>
  );
}
