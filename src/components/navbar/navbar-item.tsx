"use client";

import Link from "next/link";
import type React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface INavBarItemProps {
  label: string;
  href: string;
  className?: string;
  notifications?: number;
  icon?: LucideIcon;
}

export const NavBarItem = ({
  label,
  href,
  className,
  notifications,
  icon: Icon,
}: INavBarItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "text-primary",
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
      {notifications && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {notifications}
        </Badge>
      )}
    </Link>
  );
};
