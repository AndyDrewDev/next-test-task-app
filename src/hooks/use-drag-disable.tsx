'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface DragDisableContextValue {
  isDragDisabled: boolean
  disableDrag: () => void
  enableDrag: () => void
}

const DragDisableContext = createContext<DragDisableContextValue | null>(null)

export function DragDisableProvider({ children }: { children: ReactNode }) {
  const [isDragDisabled, setIsDragDisabled] = useState(false)

  const disableDrag = useCallback(() => setIsDragDisabled(true), [])
  const enableDrag = useCallback(() => setIsDragDisabled(false), [])

  return (
    <DragDisableContext.Provider
      value={{ isDragDisabled, disableDrag, enableDrag }}
    >
      {children}
    </DragDisableContext.Provider>
  )
}

export function useDragDisable() {
  const context = useContext(DragDisableContext)
  if (!context) {
    throw new Error('useDragDisable must be used within DragDisableProvider')
  }
  return context
}
