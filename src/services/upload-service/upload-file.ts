import axios from "axios";

export interface IUploadFileProps {
  file: File;
  signedUrl: string;
}

export async function uploadFile({ file, signedUrl }: IUploadFileProps) {
  const response = await axios.put(signedUrl, file, {
    headers: { "Content-Type": file.type },
  });

  return response;
}
