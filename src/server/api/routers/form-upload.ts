import { z } from "zod";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

import { createTRPCRouter, professionalProcedure } from "@/server/api/trpc";
import { env } from "@/env";

export const formUploadRouter = createTRPCRouter({
  getUploadPresignedUrl: professionalProcedure
    .input(z.object({ fileName: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { fileName } = input;
      const { s3Client } = ctx;

      const fileKey = `${randomUUID()}-${fileName}`;

      const s3Command = new PutObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: fileKey,
      });

      const signedUrl = await getSignedUrl(s3Client, s3Command, {
        expiresIn: 60,
      });

      return { signedUrl, fileKey };
    }),
  deleteUploadedFile: professionalProcedure
    .input(z.object({ fileKey: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { fileKey } = input;
      const { s3Client } = ctx;

      const s3Command = new DeleteObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: fileKey,
      });

      await s3Client.send(s3Command);

      return { success: true };
    }),
});
