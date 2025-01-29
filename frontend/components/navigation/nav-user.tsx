"use client";

import {
  ChevronsUpDown,
  KeyboardIcon,
  LayoutDashboardIcon,
  LogOut,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Session } from "@/lib/auth/session";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function NavUser({ session }: { session: Session | null }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {session ? (
                <>
                  {/* <AvatarLink
                    token={session.accessToken}
                    image={session.user.imageProfile as string}
                    name={session.user.name}
                    className="size-8 rounded-lg"
                  /> */}
                  <Avatar>
                    <AvatarImage
                      src={session.user.imageProfile}
                      alt={session.user.name}
                    />
                    <AvatarFallback>
                      {session.user.name.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session.user.name}
                    </span>
                    <span className="truncate text-xs">
                      {session.user.email}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">User</span>
                    <span className="truncate text-xs">Email</span>
                  </div>
                </div>
              )}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {session ? (
                  <>
                    <Avatar>
                      <AvatarImage
                        src={session.user.imageProfile}
                        alt={session.user.name}
                      />
                      <AvatarFallback>
                        {session.user.name.split(" ")[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {session.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {session.user.email}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg" />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">User</span>
                      <span className="truncate text-xs">Email</span>
                    </div>
                  </div>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="*:cursor-pointer">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutDashboardIcon />
                  <span>Dasbor</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <UserIcon />
                  <span>Profil</span>
                </Link>
                {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/settings"}>
                  <SettingsIcon />
                  <span>Pengaturan</span>
                </Link>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <KeyboardIcon />
                <span>Kunci Pintas</span>
                {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/api/auth/signout">
                <LogOut />
                <span>Keluar</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
