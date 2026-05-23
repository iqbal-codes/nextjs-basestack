"use client";

import {
  FileTextIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  PanelsTopLeftIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/navigation";

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const mainNav: NavItem[] = [
    {
      title: t("dashboard"),
      href: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: t("posts"),
      href: "/posts",
      icon: FileTextIcon,
    },
  ];

  const accountNav: NavItem[] = [
    {
      title: t("settings"),
      href: "/settings",
      icon: SettingsIcon,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="inset" className="p-0!">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/dashboard" />}
              size="lg"
              tooltip={t("brand")}
            >
              <div className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                <PanelsTopLeftIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-semibold">{t("brand")}</span>
                <span className="truncate text-sidebar-foreground/60">
                  {t("dashboard")}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActivePath(pathname, item.href)}
                    render={<Link href={item.href} />}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          {accountNav.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={isActivePath(pathname, item.href)}
                render={<Link href={item.href} />}
                tooltip={item.title}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
