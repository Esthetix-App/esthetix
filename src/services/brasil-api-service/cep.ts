import { brasilApiClient } from "../brasil-api-client";

export interface ICEPResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

export async function cep(zipcode: string) {
  const { data } = await brasilApiClient.get<ICEPResponse>(
    `/cep/v1/${zipcode}`,
  );

  return data;
}
