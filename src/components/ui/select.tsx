import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SelectProps extends React.ComponentProps<'select'> {
  options: { value: string; label: string }[]
}

function Select({ className, options, ...props }: SelectProps) {
  return (
    <div className='relative'>
      <select
        data-slot='select'
        className={cn(
          'appearance-none border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 pr-8 text-sm shadow-xs transition-[color,box-shadow] outline-none cursor-pointer',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 size-4 text-subtle pointer-events-none' />
    </div>
  )
}

export { Select }
