// import { FormDataTable } from "@/components/form-list/form-data-table";

import { FormsDataTable } from "@/components/form-list/form-data-table";

export default function FormsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Formulários</h1>
      </div>
       <div className="mt-4 flex flex-1 items-center justify-center">
        <FormsDataTable />
      </div>
    </main>
  );
}
