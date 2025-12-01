import { cn } from '@/lib/utils'
import { Label } from './label'

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
  hint?: string
  characterCount?: { current: number; max: number }
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  hint,
  characterCount,
}: FormFieldProps) {
  const isOverLimit =
    characterCount && characterCount.current > characterCount.max

  return (
    <div className='space-y-1.5'>
      <div className='flex items-center justify-between'>
        <Label htmlFor={htmlFor} className={cn(error && 'text-danger')}>
          {label}
        </Label>
        {characterCount && (
          <span
            className={cn(
              'text-xs',
              isOverLimit ? 'text-danger' : 'text-subtle'
            )}
          >
            {characterCount.current}/{characterCount.max}
          </span>
        )}
      </div>
      {children}
      {error && <p className='text-xs text-danger'>{error}</p>}
      {hint && !error && <p className='text-xs text-subtle'>{hint}</p>}
    </div>
  )
}
