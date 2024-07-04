import Link from "next/link";
import { ChevronLeft, FileClock, UserRound } from "lucide-react";

import { getInitials } from "@/lib/utils";
import { api } from "@/trpc/server";

import { CustomerDetails } from "@/components/customer-details";
import { HistoryDataTable } from "@/components/customer-history-list/history-data-table";
import { LinkFormDialog } from "@/components/link-form/link-form-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ICustomersDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function CustomersDetailsPage({
  params,
}: ICustomersDetailsPageProps) {
  const { customer, formHistoryCount } = await api.customer.getById({
    id: params.id,
  });

  return (
    <main className="flex h-full flex-1 flex-col justify-between gap-4 overflow-auto p-4 lg:gap-6 lg:p-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-7 w-7">
            <Link href="/customers">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <Avatar className="h-16 w-16">
            {customer.user.image && <AvatarImage src={customer.user.image} />}
            <AvatarFallback className="border text-base">
              {getInitials(customer.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-base font-semibold md:text-2xl">
              {customer.name}
            </h1>
            <span className="text-muted-foreground">{customer.user.email}</span>
          </div>
        </div>

        <LinkFormDialog simplifiedForm />
      </div>
      <div className="mt-6 flex w-full flex-1">
        <Tabs defaultValue="customer-data" className="w-full">
          <TabsList className="w-full px-6">
            <TabsTrigger value="customer-data">
              <UserRound className="mr-2 size-4" />
              Informações do Cliente
            </TabsTrigger>
            <TabsTrigger value="customer-history">
              <FileClock className="mr-2 size-4" />
              Histórico de Formulários{" "}
              {!!formHistoryCount && (
                <Badge
                  variant="default"
                  className="ml-2 rounded-sm px-1 font-normal"
                >
                  {formHistoryCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="customer-data">
            <CustomerDetails customer={customer} />
          </TabsContent>
          <TabsContent value="customer-history">
            <HistoryDataTable customer={customer} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
