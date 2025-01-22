import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  label?: string;
  //   role is an array of string that contains either "admin" or "customer"
  role?: ("admin" | "customer")[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}
