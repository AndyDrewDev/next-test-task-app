"use client";

import { SidebarContent } from "./sidebar-content";
import { User } from "@/types";

interface AppSidebarProps {
  user?: User;
}

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <aside className="hidden md:flex h-screen w-[220px] flex-col bg-white fixed left-0 top-0 z-40">
      <SidebarContent user={user} />
    </aside>
  );
}

