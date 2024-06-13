"use client";

import { useFormContext } from "react-hook-form";
import { Reorder, useDragControls } from "framer-motion";
import { GripVerticalIcon, Trash } from "lucide-react";

import type { IFormGroupSchema } from "@/validation/form";
import type { NewFormData } from "./hooks/use-new-form";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ProfessionalFieldTooltip } from "@/components/professional-field-tooltip";
import { FormNewSectionItemFields } from "./form-new-section-item-fields";

interface IFormNewSectionItemProps {
  index: number;
  isDraggingActive: null | boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
  section: IFormGroupSchema;
}

export const FormNewSectionItem = ({
  index,
  section,
  onRemove,
  onDragEnd,
  onDragStart,
  isDraggingActive,
}: IFormNewSectionItemProps) => {
  const controls = useDragControls();
  const { control } = useFormContext<NewFormData>();

  return (
    <Reorder.Item
      value={section}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragListener={false}
      dragControls={controls}
      className="relative"
    >
      <Card
        className={cn(
          "transition-all ease-linear",
          isDraggingActive === false && "opacity-40",
          isDraggingActive && "shadow-xl",
        )}
      >
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <CardTitle>Detalhes da Seção</CardTitle>
            <CardDescription>
              Preencha os campos abaixo com as informações da seção do
              formulário.
            </CardDescription>
          </div>
          <div className="flex items-center">
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
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <FormField
              control={control}
              name={`formGroups.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Infrome o nome da seção" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`formGroups.${index}.isProfessionalField`}
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
                      Seçao do Profissional
                    </FormLabel>
                    <ProfessionalFieldTooltip />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start border-t bg-muted/40 p-6">
          <FormNewSectionItemFields indexFormGroup={index} />
        </CardFooter>
      </Card>
    </Reorder.Item>
  );
};
