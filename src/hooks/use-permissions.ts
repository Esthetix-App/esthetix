import type { Role } from "@prisma/client";
import { useCurrentUser } from "./use-current-user";
import { useCallback } from "react";

export const usePermissions = () => {
  const user = useCurrentUser();

  const hasPermission = useCallback(
    (permission: Role): boolean => {
      if (!user) return false;

      if (user.role === "ADMIN") return true;

      return user.role === permission;
    },
    [user],
  );

  return {
    hasPermission,
  };
};
