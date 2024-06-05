"use client";

import { cn } from "@/lib/utils";
import { navigations } from "@/config/navigations";
import { useCurrentUser } from "@/hooks/use-current-user";

import { NavBarItem } from "./navbar-item";

interface INavBarItemsProps {
  className?: string;
}

export const NavBarItems = ({ className }: INavBarItemsProps) => {
  const user = useCurrentUser();

  const userRole = user?.role;

  if (!user || !userRole) {
    return null;
  }

  return (
    <nav
      className={cn(
        "grid items-start gap-1 px-2 text-sm font-medium lg:px-4",
        className,
      )}
    >
      {navigations.map((navigation) =>
        navigation.role?.includes(userRole) ? (
          <NavBarItem
            key={navigation.href}
            href={navigation.href}
            label={navigation.label}
            icon={navigation.icon}
          />
        ) : null,
      )}
    </nav>
  );
};
