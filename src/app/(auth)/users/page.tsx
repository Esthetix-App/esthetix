import { Role } from "@prisma/client";

import { RoleGate } from "@/components/role-gate";
import { UsersDataTable } from "@/components/users-list/users-data-table";

export default function UsersPage() {
  return (
    <RoleGate allowedRoles={[Role.ADMIN]}>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Usuários</h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <UsersDataTable />
        </div>
      </main>
    </RoleGate>
  );
}
