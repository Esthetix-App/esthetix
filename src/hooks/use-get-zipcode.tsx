"use client";

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { brasilApiService } from "@/services/brasil-api-service";
import type { ICEPResponse } from "@/services/brasil-api-service/cep";

interface IUseGetZipcodeProps {
  zipcode: string;
}

export const useGetZipcode = ({ zipcode }: IUseGetZipcodeProps) => {
  const response = useQuery<ICEPResponse, AxiosError>({
    queryFn: () => brasilApiService.cep(zipcode),
    queryKey: ["zipcode", zipcode],
    enabled: zipcode?.replace(/[^\d]/g, "").length === 8,
    staleTime: 1000 * 60 * 60 * 5, // 5 hours
    retry: 1,
  });

  return {
    ...response,
    zipcodeInfo: response.data || null,
  };
};
