import { FormFill } from "@/components/form-fill";

export default async function FillFormPage() {
  return (
    <main className="flex h-full flex-1 flex-col gap-4 overflow-auto md:p-4 lg:gap-6 lg:p-6">
      <FormFill />
    </main>
  );
}
