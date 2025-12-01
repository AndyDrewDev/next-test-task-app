export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://683857ff2c55e01d184cee44.mockapi.io/api/v1',
  endpoints: {
    tasks: '/tasks',
  },
} as const

export const QUERY_KEYS = {
  tasks: ['tasks'] as const,
  task: (id: string) => ['tasks', id] as const,
} as const

export const QUERY_CONFIG = {
  staleTime: 60 * 1000, // 1 minute
  gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
} as const

