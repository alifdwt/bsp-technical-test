import {
  Building2Icon,
  DatabaseIcon,
  HomeIcon,
  LandmarkIcon,
  SquareChartGanttIcon,
} from "lucide-react";

import { NavItem, NavItemWithChildren } from "@/types/nav";

export interface DocsConfig {
  mainNav: NavItem[];
  sidebarNav: NavItemWithChildren[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Beranda",
      href: "/",
      icon: HomeIcon,
    },
  ],
  sidebarNav: [
    {
      title: "Dasbor",
      href: "/dashboard",
      icon: HomeIcon,
      items: [],
      role: ["admin", "customer"],
    },
    {
      title: "Produk",
      href: "/product",
      icon: SquareChartGanttIcon,
      items: [],
      role: ["admin", "customer"],
    },
    // {
    //   title: "Polis",
    //   href: "/policy",
    //   icon: NotepadTextIcon,
    //   items: [],
    //   role: ["admin", "customer"],
    // },
    {
      title: "Data Master",
      icon: DatabaseIcon,
      items: [
        {
          title: "Jenis Bangunan",
          href: "/master-data/building-type",
          icon: Building2Icon,
          role: ["admin"],
          items: [],
        },
        {
          title: "Kantor Cabang",
          href: "/master-data/branch",
          icon: LandmarkIcon,
          role: ["admin"],
          items: [],
        },
      ],
      role: ["admin"],
    },
  ],
};
