"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlusCircle } from "lucide-react";

import type { NewFormData } from "../hooks/use-new-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { FormNewOptionItem } from "@/components/form-new/field-options/form-new-option-item";

interface IFormNewFieldItemOptionsProps {
  indexField: number;
  indexFormGroup: number;
}

export const FieldOptionsList = ({
  indexField,
  indexFormGroup,
}: IFormNewFieldItemOptionsProps) => {
  const { control } = useFormContext<NewFormData>();

  const [draggingIndex, setDraggingIndex] = useState<null | number>(null);
  const { fields, append, move, remove } = useFieldArray({
    name: `formGroups.${indexFormGroup}.formFields.${indexField}.fieldOptions`,
    keyName: "key",
    control,
  });

  const handleAddNewField = () => {
    append({ name: "" });
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleReorder = (newOrder: typeof fields) => {
    if (draggingIndex === null) {
      return;
    }

    const draggingLink = fields[draggingIndex];

    newOrder.forEach((link, index) => {
      if (link === draggingLink) {
        move(draggingIndex, index);
        setDraggingIndex(index);
      }
    });
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-start justify-start gap-6 transition-all ease-linear",
      )}
    >
      <span className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Opções do campo
      </span>

      <Reorder.Group
        axis="y"
        values={fields}
        onReorder={handleReorder}
        className="w-full px-6"
      >
        {fields.map((field, index) => (
          <FormNewOptionItem
            key={field.key}
            index={index}
            indexField={indexField}
            optionField={field}
            indexFormGroup={indexFormGroup}
            onDragEnd={handleDragEnd}
            onDragStart={() => handleDragStart(index)}
            onRemove={() => remove(index)}
            isDraggingActive={
              draggingIndex === null ? null : draggingIndex === index
            }
          />
        ))}
      </Reorder.Group>
      <Button
        type="button"
        size="sm"
        variant="default"
        onClick={handleAddNewField}
        className="ml-8 flex gap-1"
      >
        <PlusCircle className="h-3.5 w-3.5" />
        Adicionar Opção
      </Button>
    </div>
  );
};
