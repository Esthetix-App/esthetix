"use client";

import { useFormContext } from "react-hook-form";
import { Reorder, useDragControls } from "framer-motion";
import { GripVerticalIcon, Trash } from "lucide-react";

import type { IFormOptionSchema } from "@/validation/form";
import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IFormOptionItemProps {
  index: number;
  indexField: number;
  indexFormGroup: number;
  isDraggingActive: null | boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
  optionField: IFormOptionSchema;
}

export const FormOptionItem = ({
  index,
  indexField,
  indexFormGroup,
  optionField,
  onRemove,
  onDragEnd,
  onDragStart,
  isDraggingActive,
}: IFormOptionItemProps) => {
  const controls = useDragControls();
  const { control } = useFormContext();

  return (
    <Reorder.Item
      value={optionField}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragListener={false}
      dragControls={controls}
      className="relative"
    >
      <div
        className={cn(
          "flex flex-col gap-6 rounded-lg bg-background p-2 transition-all ease-linear",
          isDraggingActive === false && "opacity-40",
          isDraggingActive && "shadow-xl",
        )}
      >
        <div className="flex items-baseline gap-4">
          <FormField
            control={control}
            name={`formGroups.${indexFormGroup}.formFields.${indexField}.fieldOptions.${index}.name`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome da opção</FormLabel>
                <FormControl>
                  <Input placeholder="Infrome o nome do campo" {...field} />
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
      </div>
    </Reorder.Item>
  );
};
