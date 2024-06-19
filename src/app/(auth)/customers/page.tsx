import { CustomersDataTable } from "@/components/customers-list/customers-data-table";

export default function CustomersPage() {
  return (
    <main className="flex h-full flex-1 flex-col justify-between gap-4 overflow-auto p-4 lg:gap-6 lg:p-10">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <CustomersDataTable />
      </div>
    </main>
  );
}
