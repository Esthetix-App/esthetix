import type { Role } from "@prisma/client";
import {
  FileSpreadsheet,
  Home,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

interface INavigation {
  label: string;
  href: string;
  role?: Role[];
  icon: LucideIcon;
}

export const navigations: INavigation[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    role: ["ADMIN", "CUSTOMER", "PROFESSIONAL"],
    icon: Home,
  },
  {
    href: "/forms",
    label: "Formulários",
    role: ["ADMIN", "PROFESSIONAL"],
    icon: FileSpreadsheet,
  },
  {
    href: "/customers",
    label: "Clientes",
    role: ["ADMIN", "PROFESSIONAL"],
    icon: Users,
  },
  {
    href: "/users",
    label: "Usuários",
    role: ["ADMIN"],
    icon: UserCog,
  },
];
