'use client'

import { formatDate } from '@/lib/utils'

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  const { dayOfWeek, rest } = formatDate(new Date())

  return (
    <div className='space-y-1'>
      <h1 className='text-xl font-medium text-heading'>{title}</h1>
      <p className='text-sm text-subtle'>
        <span className='text-success'>{dayOfWeek},</span> {rest}
      </p>
    </div>
  )
}
