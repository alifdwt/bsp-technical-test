import React from "react";

import AppSidebarContainer from "@/components/navigation/app-sidebar-container";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebarContainer />
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
