'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--color-white)',
          '--normal-text': 'var(--color-black)',
          '--normal-border': 'var(--color-border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

