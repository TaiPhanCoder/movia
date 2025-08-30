'use client';

import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that unused/inactive cache data remains in memory
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Time in milliseconds that the cache survives unused/inactive
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      // Retry failed requests
      retry: 3,
      // Retry delay
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
    },
  },
});

export default queryClient;