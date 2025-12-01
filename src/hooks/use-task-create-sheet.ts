'use client'

import { useState, useCallback } from 'react'

export function useTaskCreateSheet() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    setIsOpen,
    open,
    close,
  }
}

