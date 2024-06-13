"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./scroll-area";

interface IComboboxOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface IComboboxProps {
  value?: string;
  placeholder?: string;
  emptyLabel?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  options: IComboboxOption[];
  onSelect?: (currentValue: string) => void;
}

export function Combobox({
  value,
  options,
  isLoading,
  placeholder,
  onSelect,
  searchPlaceholder = "Pesquisar...",
  emptyLabel = "Nenhum item encontrado.",
}: IComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedValue = options?.find((framework) => framework.value === value);
  const SelectedIcon = selectedValue?.icon ?? null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value ? (
            <div className="flex items-center gap-2">
              {SelectedIcon && <SelectedIcon className="h-4 w-4" />}
              {selectedValue?.label}
            </div>
          ) : (
            <span className="text-muted-foreground/70">{placeholder}</span>
          )}
          {isLoading ? (
            <LoaderCircle className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <ScrollArea className="h-72">
              <CommandInput placeholder={searchPlaceholder} />
              <CommandEmpty>
                {isLoading ? "Carregando..." : emptyLabel}
              </CommandEmpty>
              <CommandGroup>
                {options
                  ?.filter((x) => x.value)
                  .map(({ icon: Icon, ...option }) => (
                    <CommandItem
                      className="gap-2"
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        onSelect?.(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="flex-1 text-sm">{option.label}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
