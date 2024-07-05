import { FormNew } from "@/components/form-new";

export default function NewFormPage() {
  return (
    <main className="flex h-full flex-1 flex-col gap-4 overflow-auto md:p-4 lg:gap-6 lg:p-6">
      <FormNew />
    </main>
  );
}
