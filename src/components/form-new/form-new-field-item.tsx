"use client";

import { useFormContext } from "react-hook-form";
import { Reorder, useDragControls } from "framer-motion";
import { GripVerticalIcon, Trash } from "lucide-react";

import type { FieldTypes } from "@prisma/client";
import type { IFormFieldSchema } from "@/validation/form";
import type { NewFormData } from "./hooks/use-new-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { fieldTypes } from "@/constants/field-types";
import { ProfessionalFieldTooltip } from "@/components/professional-field-tooltip";
import { FormNewFieldItemOptions } from "./form-new-field-item-options";

interface IFormNewFieldItemProps {
  index: number;
  indexFormGroup: number;
  isDraggingActive: null | boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
  field: IFormFieldSchema;
}

export const FormNewFieldItem = ({
  index,
  field,
  onRemove,
  onDragEnd,
  onDragStart,
  indexFormGroup,
  isDraggingActive,
}: IFormNewFieldItemProps) => {
  const controls = useDragControls();
  const { control, setValue, watch } = useFormContext<NewFormData>();

  const isProfessionalSection = watch(
    `formGroups.${indexFormGroup}.isProfessionalField`,
  );

  return (
    <Reorder.Item
      value={field}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragListener={false}
      dragControls={controls}
      className="relative"
    >
      <div
        className={cn(
          "flex flex-col gap-6 rounded-lg border border-dashed border-muted-foreground/40 bg-background p-6 shadow-sm transition-all ease-linear",
          isDraggingActive === false && "opacity-40",
          isDraggingActive && "shadow-xl",
        )}
      >
        <div className="flex items-baseline gap-4">
          <FormField
            control={control}
            name={`formGroups.${indexFormGroup}.formFields.${index}.name`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Infrome o nome do campo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`formGroups.${indexFormGroup}.formFields.${index}.type`}
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>Tipo do campo</FormLabel>
                <FormControl>
                  <Combobox
                    options={fieldTypes}
                    value={field.value}
                    placeholder="Selecione o tipo"
                    onSelect={(currentValue) => {
                      setValue(
                        `formGroups.${indexFormGroup}.formFields.${index}.type`,
                        currentValue as FieldTypes,
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-9 flex items-center self-start">
            <Button
              size="icon"
              type="button"
              variant="ghost"
              onClick={onRemove}
              className="cursor-pointer text-primary"
            >
              <Trash className="size-4" />
            </Button>
            <Button
              size="icon"
              type="button"
              variant="link"
              onPointerDown={(e) => controls.start(e)}
              className="cursor-grab"
            >
              <GripVerticalIcon className="size-4" />
            </Button>
          </div>
        </div>

        <FormNewFieldItemOptions
          indexField={index}
          indexFormGroup={indexFormGroup}
        />

        <div className="flex gap-4">
          <FormField
            control={control}
            name={`formGroups.${indexFormGroup}.formFields.${index}.isRequired`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">
                    Campo obrigatório
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isProfessionalSection && (
            <FormField
              control={control}
              name={`formGroups.${indexFormGroup}.formFields.${index}.isProfessionalField`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      Campo do Profissional
                    </FormLabel>
                    <ProfessionalFieldTooltip />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </Reorder.Item>
  );
};
