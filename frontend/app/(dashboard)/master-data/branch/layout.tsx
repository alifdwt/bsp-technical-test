import React from "react";

import PageHeader from "@/components/layout/PageHeader";

export default function BranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <PageHeader
        title={"Cabang"}
        description={
          <>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            quod reiciendis quam ullam maiores dolorum, cumque quidem ipsam
            officia, quas perferendis quis sit? Asperiores qui harum corporis
            totam, quos voluptas tempora est minus dicta iusto mollitia
            consequatur eius veritatis dolore obcaecati impedit earum odit,
            optio vero ad! Facere, labore voluptate?
          </>
        }
      />

      <div className="max-w-[96vw] rounded-xl border bg-white p-4 shadow">
        {children}
      </div>
    </div>
  );
}
