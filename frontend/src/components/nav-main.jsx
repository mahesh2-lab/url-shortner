"use client";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible "
          >
            <NavLink to={item.url}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={item.isActive}
                  className="font-normal text-base"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </NavLink>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
