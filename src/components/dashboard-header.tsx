"use client";

import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NavigationLabel = "dashboard" | "posts" | "profile" | "settings";

function getCurrentPageLabel(pathname: string): NavigationLabel {
  if (pathname.startsWith("/posts")) {
    return "posts";
  }

  if (pathname.startsWith("/profile")) {
    return "profile";
  }

  if (pathname.startsWith("/settings")) {
    return "settings";
  }

  return "dashboard";
}

export function DashboardHeader() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const { state } = useSidebar();
  const currentPageLabel = t(getCurrentPageLabel(pathname));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur transition-[height] duration-300 ease-out supports-backdrop-filter:bg-background/60 motion-reduce:transition-none",
        state === "expanded" ? "h-16" : "h-14",
      )}
    >
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-vertical:h-8" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:inline-flex">
              <BreadcrumbLink render={<Link href="/dashboard" />}>
                {t("dashboard")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:inline-flex" />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="relative size-8 rounded-full p-0"
          >
            <Avatar className="size-8">
              <AvatarImage src="" alt={t("avatarAlt")} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="sr-only">{t("avatarAlt")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem>
            <Link href="/profile" className="w-full">
              {t("profile")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings" className="w-full">
              {t("settings")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
