import { brasilApiClient } from "../brasil-api-client";

interface ICEPResponse {
  nome: string;
  codigo_ibge: string;
}
[];

export async function cities(uf: string) {
  const { data } = await brasilApiClient.get<ICEPResponse>(
    `/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`,
  );

  return data;
}
