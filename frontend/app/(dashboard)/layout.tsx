import { redirect } from "next/navigation";
import React from "react";

import { NavUser } from "@/components/navigation/nav-user";
import { AppSidebar } from "@/components/navigation/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/session";

export default async function Layout({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    return redirect("/auth/sigin");
  }

  return (
    <SidebarProvider>
      <AppSidebar
        navUser={<NavUser session={session} />}
        role={session.user.role}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumbs}
          </div>
        </header>

        <main className="flex-1 bg-dotted-pattern bg-cover bg-fixed bg-center p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
