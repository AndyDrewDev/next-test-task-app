'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface NavLinkProps {
  href: string
  icon: LucideIcon | React.FC<{ className?: string }>
  children: React.ReactNode
}

export function NavLink({ href, icon: Icon, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-1 py-2 text-sm font-normal transition-colors',
        isActive ? 'text-success' : 'text-subtle hover:text-success/80'
      )}
    >
      <Icon className='size-5' />
      <span>{children}</span>
    </Link>
  )
}
