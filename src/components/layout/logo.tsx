import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3 py-4 mb-4', className)}>
      <div className='flex size-8 items-center justify-center rounded-full bg-warning'>
        <span className='text-lg font-medium text-white'>C</span>
      </div>
      <span className='text-xl font-semibold text-heading'>TESTAPP</span>
    </div>
  )
}
