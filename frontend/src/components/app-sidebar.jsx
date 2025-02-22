import * as React from "react";
import {
  BookOpen,
  Settings2,
  Plus,
  Link,
  ChartNoAxesCombined,
  Home,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      icon: Home,
      isActive: true,
      url: "/home",
    },
    {
      title: "Links",
      icon: Link,
      url: "/links",
    },
    {
      title: "Analytics",
      icon: ChartNoAxesCombined,
      url: "/analytics",
    },
    {
      title: "Documentation",
      icon: BookOpen,
      url: "/documentation",
    },
    {
      title: "Settings",
      icon: Settings2,
      url: "/settings",
    },
  ],
};

export function AppSidebar({ ...props }) {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex bg-transparent items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img
                    src="https://res.cloudinary.com/dmeje67pr/image/upload/v1740223502/skas5dteznuujiflwx7r.svg"
                    alt="Logo"
                    className=" h-8 bg-contain bg-blend-overlay"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold font-lobster text-xl">
                    SnapLink{" "}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItem className="flex items-center justify-center px-2">
          <SidebarMenuButton size="lg" asChild>
            <NavLink to="/create">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Plus />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Create Link </span>
              </div>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            isActive: location.pathname === item.url,
          }))}
        />
      </SidebarContent>
    </Sidebar>
  );
}
