import { redirect, RedirectType } from "next/navigation";

import { deleteSession } from "@/lib/auth/session";

export async function GET() {
  await deleteSession();
  redirect("/", RedirectType.push);
}
