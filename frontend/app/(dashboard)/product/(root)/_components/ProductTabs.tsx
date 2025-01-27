"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { TProduct } from "@/constants/product";

const ProductTabs = ({ products }: { products: TProduct[] }) => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between rounded-xl border bg-white p-4 shadow">
      <div className="flex gap-2">
        {products.map((product, index) => (
          <Button
            asChild
            key={index}
            variant={product.href === pathname ? "default" : "outline"}
            className="rounded-full"
          >
            <Link href={product.href}>{product.title}</Link>
          </Button>
        ))}
      </div>

      <Button asChild>
        <Link href={`${pathname}/create`}>Pengajuan Klaim</Link>
      </Button>
    </div>
  );
};

export default ProductTabs;
