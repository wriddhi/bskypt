"use client";

import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";

export const queryClient = new QueryClient();

export default function Providers({
  children,
  visits,
}: PropsWithChildren<{ visits: number }>) {
  queryClient.setQueryData(["visits"], visits);
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
