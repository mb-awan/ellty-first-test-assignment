"use client";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/libs/queryClient";

export const TanstackQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};