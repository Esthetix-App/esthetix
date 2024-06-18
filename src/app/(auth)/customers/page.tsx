import { CustomersDataTable } from "@/components/customers-list/customers-data-table";

export default function CustomersPage() {
  return (
    <main className="relative flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
      </div>
      <div className="flex flex-1 items-start justify-center">
        <CustomersDataTable />
      </div>
    </main>
  );
}
