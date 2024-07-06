"use client";

import type React from "react";
import type { Role } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export const RoleGate = ({ children, allowedRoles = [] }: RoleGateProps) => {
  const user = useCurrentUser();

  if (!user?.role || !allowedRoles.includes(user?.role)) {
    return null;
  }

  return <>{children}</>;
};
