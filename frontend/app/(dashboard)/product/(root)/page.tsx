import { redirect } from "next/navigation";

import { products } from "@/constants/product";

export default function ProductPage() {
  return redirect(products[0].href);
}
