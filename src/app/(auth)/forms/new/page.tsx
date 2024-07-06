import { Role } from "@prisma/client";

import { FormNew } from "@/components/form-new";
import { RoleGate } from "@/components/role-gate";

export default function NewFormPage() {
  return (
    <RoleGate allowedRoles={[Role.ADMIN, Role.PROFESSIONAL]}>
      <main className="flex h-full flex-1 flex-col gap-4 overflow-auto md:p-4 lg:gap-6 lg:p-6">
        <FormNew />
      </main>
    </RoleGate>
  );
}
