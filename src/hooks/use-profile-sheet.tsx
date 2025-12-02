'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface ProfileSheetContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  open: () => void
  close: () => void
}

const ProfileSheetContext = createContext<ProfileSheetContextValue | null>(null)

export function ProfileSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ProfileSheetContext.Provider value={{ isOpen, setIsOpen, open, close }}>
      {children}
    </ProfileSheetContext.Provider>
  )
}

export function useProfileSheet() {
  const context = useContext(ProfileSheetContext)
  if (!context) {
    throw new Error('useProfileSheet must be used within ProfileSheetProvider')
  }
  return context
}
