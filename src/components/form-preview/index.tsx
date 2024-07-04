import * as React from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormRender, type FormDataType } from "@/components/form-render";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useFormContext } from "react-hook-form";
import type { NewFormData } from "../form-new/hooks/use-new-form";
import { createId } from "@paralleldrive/cuid2";

export function FormPreview() {
  const { watch } = useFormContext<NewFormData>();

  const formRenderData = watch();

  const formDataMemo = React.useMemo((): FormDataType => {
    const formId = createId();

    return {
      isProfessionalUser: true,
      form: {
        formId,
        ...formRenderData,
        formGroups:
          formRenderData.formGroups?.map((formGroup) => {
            const formGroupId = createId();

            return {
              formId,
              id: formGroupId,
              ...formGroup,
              formFields:
                formGroup.formFields.map((formField) => {
                  const formFieldId = createId();

                  return {
                    id: formFieldId,
                    formGroupId,
                    ...formField,
                    fieldOptions:
                      formField.fieldOptions?.map((fieldOption) => ({
                        formFieldId,
                        id: createId(),
                        ...fieldOption,
                      })) ?? [],
                  };
                }) ?? [],
            };
          }) ?? [],
      },
    };
  }, [formRenderData]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Eye className="mr-2 size-5 stroke-[1.5] text-primary" />
          Preview
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full overflow-y-auto">
          <div className="container h-[80vh] max-w-[1200px] py-9">
            <DrawerHeader className="mb-20 p-0">
              <DrawerTitle className="flex items-center gap-2">
                <Eye className="size-6 stroke-[1.5] text-primary" />
                Preview do Formulário
              </DrawerTitle>
              <DrawerDescription>
                Visualize como um formulário será exibido para os destinatários
                antes de finalizá-lo.
              </DrawerDescription>
            </DrawerHeader>
            <FormRender data={formDataMemo} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
