export type BreadcrumbItem = {
  name: string;
  href?: string;
  isCurrentPage?: boolean;
};

type Breadcrumbs = Record<string, BreadcrumbItem[]>;

export const breadcrumbs: Breadcrumbs = {
  "/dashboard": [
    {
      name: "Dashboard",
      isCurrentPage: true,
    },
  ],
  "/forms": [
    {
      name: "Formulários",
      isCurrentPage: true,
    },
  ],
  "/forms/new": [
    {
      name: "Formulários",
      href: "/forms",
    },
    {
      name: "Novo Formulário",
      isCurrentPage: true,
    },
  ],
  "/customers": [
    {
      name: "Clientes",
      isCurrentPage: true,
    },
  ],
  "/users": [
    {
      name: "Usuários",
      isCurrentPage: true,
    },
  ],
  "/users/new": [
    {
      name: "Usuários",
      href: "/users",
    },
    {
      name: "Novo Usuário",
      isCurrentPage: true,
    },
  ],
};
