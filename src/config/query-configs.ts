import type { QueryClientConfig } from "@tanstack/react-query";

export const queryConfigs: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      retryDelay: 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};
