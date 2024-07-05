"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

import { api } from "@/trpc/react";
import { uploadService } from "@/services/upload-service";

import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  FileCard,
  FileUploader,
  type FileUpload,
} from "@/components/ui/file-uploader";

interface IFieldOptionsUpload {
  indexField: number;
  indexFormGroup: number;
}

export const FieldOptionsUpload = ({
  indexField,
  indexFormGroup,
}: IFieldOptionsUpload) => {
  const { control, setValue, watch } = useFormContext();
  // const [fileKey, setFileKey] = React.useState<string | null>(null);
  const [fileDone, setFileDone] = React.useState<FileUpload | null>(null);

  const getPresignedUrl = api.formUpload.getUploadPresignedUrl.useMutation();
  const deleteUploadedFile = api.formUpload.deleteUploadedFile.useMutation();

  const fieldName = `formGroups.${indexFormGroup}.formFields.${indexField}.typeOptions.image`;
  const imageKey = watch(fieldName) as string | null;
  const isDisabled = !!imageKey;

  const handleUpload = async (files: FileUpload[]) => {
    try {
      const file = files?.[0];

      if (!file) return;

      const fileName = file.name;
      const response = await getPresignedUrl.mutateAsync({
        fileName,
      });
      await uploadService.uploadFile({ file, signedUrl: response.signedUrl });

      setFileDone(file);
      setValue(fieldName, response.fileKey);
    } catch (error) {
      setFileDone(null);
      setValue(fieldName, "");

      throw new Error("Error on upload!");
    }
  };

  const handleDeleteFile = () => {
    if (!imageKey) {
      return;
    }

    deleteUploadedFile.mutate({ fileKey: imageKey });
    setFileDone(null);
    setValue(fieldName, "");
  };

  return (
    <FormField
      name={fieldName}
      control={control}
      defaultValue=""
      render={() => (
        <FormItem className="w-full overflow-hidden">
          <FormLabel>Upload</FormLabel>
          <FormControl>
            <>
              {!fileDone && (
                <FileUploader
                  maxFiles={1}
                  maxSize={4 * 1024 * 1024}
                  onUpload={handleUpload}
                  disabled={isDisabled}
                  showFilesList={false}
                />
              )}
              {(fileDone || imageKey) && (
                <FileCard
                  imageKey={imageKey}
                  onRemove={handleDeleteFile}
                  file={fileDone as File}
                />
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
