import React from "react";

import PageHeader from "@/components/layout/PageHeader";

export default function BuildingTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <PageHeader
        title={"Jenis Bangunan"}
        description={
          <>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa
            pariatur id at rerum laborum voluptate, commodi voluptates
            repellendus non iste quo soluta earum officia perferendis odio,
            error necessitatibus omnis aliquid quidem veritatis voluptatem,
            libero quisquam consequatur quos. Odit obcaecati facere esse! Minima
            nesciunt temporibus adipisci eveniet ipsa numquam mollitia expedita.
          </>
        }
      />

      <div className="max-w-[96vw] rounded-xl border bg-white p-4 shadow">
        {children}
      </div>
    </div>
  );
}
