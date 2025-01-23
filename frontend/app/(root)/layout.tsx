import React from "react";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { getSession } from "@/lib/auth/session";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <div className="flex h-screen flex-col">
      <Header session={session} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
