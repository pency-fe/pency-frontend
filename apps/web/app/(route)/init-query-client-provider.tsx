"use client";

// QueryClientProvider는 내부적으로 useContext를 사용하므로, 최상단에 "use client"를 추가해야 합니다.
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./get-query-client";

export function InitQueryClientProvider({ children }: { children?: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
