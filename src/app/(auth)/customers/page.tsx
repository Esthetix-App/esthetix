import { CustomersDataTable } from "@/components/customers-list/customers-data-table";

export default function CustomersPage() {
  return (
    <main className="flex h-full flex-1 flex-col justify-between gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
        <p className="text-sm text-muted-foreground">
          Listagem de clientes ativos na plataforma.
        </p>
      </div>
      <div className="mt-4 flex flex-1 items-center justify-center overflow-hidden">
        <CustomersDataTable />
      </div>
    </main>
  );
}
