"use client";

import * as React from "react";

import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { docsConfig } from "@/constants/navigation";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navUser: React.ReactNode;
  role: "admin" | "customer";
}

export function AppSidebar({ navUser, role, ...props }: AppSidebarProps) {
  const data = {
    teams: {
      name: "Binasentra Purna",
      plan: "Nasabah",
    },
  };

  const filteredNav = docsConfig.sidebarNav.filter((item) =>
    item.role?.includes(role)
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />
      </SidebarContent>
      <SidebarFooter>{navUser}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
