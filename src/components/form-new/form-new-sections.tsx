"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import { Group, PlusCircle } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";

import type { NewFormData } from "./hooks/use-new-form";

import { FormNewSectionItem } from "./form-new-section-item";
import { Button } from "@/components/ui/button";

export const FormNewSections = () => {
  const [draggingIndex, setDraggingIndex] = useState<null | number>(null);
  const { control } = useFormContext<NewFormData>();
  const { fields, append, move, remove } = useFieldArray({
    control,
    keyName: "key",
    name: "formGroups",
  });

  const handleAddNewSection = () => {
    append({
      name: "",
      formFields: [
        {
          name: "",
          type: "TEXT",
          typeOptions: null,
          fieldOptions: null,
          isRequired: false,
          isProfessionalField: false,
          position: fields.length,
          size: "SM",
        },
      ],
      position: fields.length,
      isProfessionalField: false,
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
    <div className="grid items-start gap-4">
      <div className="flex items-center gap-2 pl-2">
        <Group className="size-5 text-primary" />
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          Seções do Formulário
        </h3>
      </div>

      <Reorder.Group
        axis="y"
        values={fields}
        className="space-y-4"
        onReorder={handleReorder}
      >
        {fields.map((section, index) => (
          <FormNewSectionItem
            key={section.key}
            index={index}
            section={section}
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
        size="lg"
        type="button"
        variant="ghost"
        className="flex gap-1"
        onClick={handleAddNewSection}
      >
        <PlusCircle className="h-3.5 w-3.5" />
        Adicionar Seção
      </Button>
    </div>
  );
};
