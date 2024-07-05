"use client";

import Image from "next/image";
import { ImageIcon, Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { env } from "@/env";
import { api } from "@/trpc/react";
import { uploadService } from "@/services/upload-service";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUploader, type FileUpload } from "@/components/ui/file-uploader";

export const FormLogoUpload = () => {
  const { control, setValue, watch } = useFormContext();

  const getPresignedUrl = api.formUpload.getUploadPresignedUrl.useMutation();
  const deleteUploadedFile = api.formUpload.deleteUploadedFile.useMutation();

  const logoUrl = watch("logoUrl") as string | null;
  const isDisabled = !!logoUrl;

  const handleUpload = async (files: FileUpload[]) => {
    try {
      const file = files?.[0];

      if (!file) return;

      const fileName = file.name;
      const response = await getPresignedUrl.mutateAsync({
        fileName,
      });
      await uploadService.uploadFile({ file, signedUrl: response.signedUrl });

      setValue("logoUrl", response.fileKey);
    } catch (error) {
      setValue("logoUrl", "");

      throw new Error("Error on upload!");
    }
  };

  const handleDeleteFile = () => {
    if (!logoUrl) {
      return;
    }

    deleteUploadedFile.mutate({ fileKey: logoUrl });
    setValue("logoUrl", "");
  };

  return (
    <Card className="min-w-[250px] overflow-hidden border-b-4 border-b-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 whitespace-nowrap">
          <ImageIcon className="size-4 text-primary" />
          Logo do Formulário
        </CardTitle>
        <CardDescription>
          Imagem que vai aparecer no topo do formulário.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="relative">
            <Image
              alt="Product image"
              width={250}
              height={250}
              loading="lazy"
              src={
                logoUrl
                  ? `${env.NEXT_PUBLIC_BUCKET_URL}/${logoUrl}`
                  : "/images/placeholder.svg"
              }
              className="aspect-square w-full shrink-0 rounded-md object-cover"
            />
            {!!logoUrl && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute -right-2 -top-3 size-7 shadow-md"
                onClick={handleDeleteFile}
              >
                <Trash className="size-4" aria-hidden="true" />
                <span className="sr-only">Remove file</span>
              </Button>
            )}
          </div>
          <FormField
            control={control}
            name="logoUrl"
            render={({}) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    maxFiles={1}
                    maxSize={4 * 1024 * 1024}
                    onUpload={handleUpload}
                    disabled={isDisabled}
                    showFilesList={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
