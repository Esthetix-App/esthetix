import { Role } from "@prisma/client";

import { FormEdit } from "@/components/form-edit";
import { RoleGate } from "@/components/role-gate";

export default function EditFormPage() {
  return (
    <RoleGate allowedRoles={[Role.ADMIN, Role.PROFESSIONAL]}>
      <main className="flex h-full flex-1 flex-col gap-4 overflow-auto p-4 lg:gap-6 lg:p-6">
        <FormEdit />
      </main>
    </RoleGate>
  );
}
