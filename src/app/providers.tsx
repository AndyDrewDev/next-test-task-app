'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { ProfileSheetProvider, DragDisableProvider } from '@/hooks'
import { ProfileSheet } from '@/components/layout/profile-sheet'
import { QUERY_CONFIG } from '@/config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.staleTime,
      gcTime: QUERY_CONFIG.gcTime,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DragDisableProvider>
        <ProfileSheetProvider>
          {children}
          <ProfileSheet />
        </ProfileSheetProvider>
      </DragDisableProvider>
      <Toaster richColors position='bottom-center' />
    </QueryClientProvider>
  )
}
