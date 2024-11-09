"use client";

import { ReactNode } from "react";
import { InitThemeProvider } from "@pency/ui/theme";
import { getQueryClient } from "./get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Snackbar } from "@pency/ui/components";

type Props = {
  children?: ReactNode;
};
export function Providers({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <InitThemeProvider>
        {children}
        <Snackbar />
      </InitThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
