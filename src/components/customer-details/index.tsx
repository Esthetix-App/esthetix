"use client";

import { Home, Info } from "lucide-react";
import type { RouterOutputs } from "@/trpc/react";
import { formatPhoneNumber } from "react-phone-number-input";

type CustomerGetById = RouterOutputs["customer"]["getById"]["customer"];

interface ICustomerDetailsProps {
  customer: CustomerGetById;
}

export const CustomerDetails = ({ customer }: ICustomerDetailsProps) => {
  return (
    <div className="grid gap-4 px-6">
      <section className="rounded-md border p-6 pb-6 shadow-sm">
        <span className="flex items-center gap-2 font-semibold text-primary">
          <Info className="size-4" />
          Informações básicas
        </span>

        <div className="mt-6 flex flex-wrap items-center gap-8">
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Nome completo
            </span>
            <span className="text-sm font-medium">{customer.name}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Data de nascimento
            </span>
            <span className="text-sm font-medium">{customer.birthdate}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              CPF
            </span>
            <span className="text-sm font-medium">{customer.cpf}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              RG
            </span>
            <span className="text-sm font-medium">{customer.rg}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Telefone
            </span>
            <span className="text-sm font-medium">
              {formatPhoneNumber(customer.cellphone)}
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-8">
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Como nos conheceu
            </span>
            <span className="text-sm font-medium">{customer.howMet}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Criado em
            </span>
            <span className="text-sm font-medium">{customer.createdAt}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Última atualização
            </span>
            <span className="text-sm font-medium">{customer.updatedAt}</span>
          </div>
        </div>
      </section>
      <section className="rounded-md border p-6 pb-6 shadow-sm">
        <span className="flex items-center gap-2 font-semibold text-primary">
          <Home className="size-4" />
          Endereço
        </span>

        <div className="mt-6 flex flex-wrap items-center gap-8">
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Estado
            </span>
            <span className="text-sm font-medium">
              {customer.address.state}
            </span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Cidade
            </span>
            <span className="text-sm font-medium">{customer.address.city}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              CEP
            </span>
            <span className="text-sm font-medium">
              {customer.address.zipcode}
            </span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Rua
            </span>
            <span className="text-sm font-medium">
              {customer.address.street}
            </span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Número
            </span>
            <span className="text-sm font-medium">
              {customer.address.number}
            </span>
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground/70">
              Complemento
            </span>
            <span className="text-sm font-medium">
              {customer.address.complement}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
