"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ChevronDown, ChevronUp, Cuboid, PlusCircle } from "lucide-react";

import { CardDescription, CardTitle } from "@/components/ui/card";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { FormNewFieldItem } from "./form-new-field-item";
import type { NewFormData } from "./hooks/use-new-form";

interface IFormNewSectionItemFieldsProps {
  indexFormGroup: number;
}

export const FormNewSectionItemFields = ({
  indexFormGroup,
}: IFormNewSectionItemFieldsProps) => {
  const { control } = useFormContext<NewFormData>();
  const [draggingIndex, setDraggingIndex] = useState<null | number>(null);
  const { fields, append, move, remove } = useFieldArray({
    name: `formGroups.${indexFormGroup}.formFields`,
    keyName: "key",
    control,
  });

  const handleAddNewField = () => {
    append({
      name: "",
      type: "TEXT",
      typeOptions: null,
      fieldOptions: null,
      isRequired: false,
      isProfessionalField: false,
      position: fields.length,
    });
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
    <Collapsible className="w-full">
      <CollapsibleTrigger
        type="button"
        className="group flex w-full flex-1 items-center justify-between"
      >
        <div className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2">
            <Cuboid className="size-4 text-primary" />
            Campos da Seção
          </CardTitle>
          <CardDescription className="text-start">
            Adicione abaixo os campos da seção presentes nesse formulário.
          </CardDescription>
        </div>
        <Button asChild size="icon" variant="ghost">
          <div>
            <ChevronDown className="h-3.5 w-3.5 group-data-[state='open']:hidden" />
            <ChevronUp className="hidden h-3.5 w-3.5 text-primary group-data-[state='open']:flex" />
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-10">
        <div className="flex flex-col gap-6">
          <Reorder.Group
            axis="y"
            values={fields}
            className="space-y-4"
            onReorder={handleReorder}
          >
            {fields.map((field, index) => (
              <FormNewFieldItem
                key={field.key}
                index={index}
                field={field}
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
        </div>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={handleAddNewField}
          className="mx-auto mt-4 flex gap-1"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Adicionar Campo
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};
