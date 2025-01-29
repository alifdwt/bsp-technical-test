import React from "react";

import { getSession } from "@/lib/auth/session";

import { NavUser } from "./nav-user";
import { AppSidebar } from "./sidebar";

const AppSidebarContainer = async () => {
  const session = await getSession();

  return (
    <AppSidebar
      navUser={<NavUser session={session} />}
      role={session?.user.role || "customer"}
    />
  );
};

export default AppSidebarContainer;
