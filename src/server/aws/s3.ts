import { S3Client } from "@aws-sdk/client-s3";

import { env } from "@/env";

const { ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = env;

export const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});
