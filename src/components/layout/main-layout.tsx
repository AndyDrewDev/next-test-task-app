'use client'

import { AppSidebar } from './app-sidebar'
import { MobileNav } from './mobile-nav'
import { RightPanel } from './right-panel'
import { User } from '@/types'

interface MainLayoutProps {
  children: React.ReactNode
  user?: User
  rightPanel?: boolean
}

export function MainLayout({
  children,
  user,
  rightPanel = false,
}: MainLayoutProps) {
  return (
    <div className='min-h-screen flex'>
      <AppSidebar user={user} />

      <MobileNav user={user} />

      <main className='md:ml-[220px] min-h-screen pt-14 md:pt-0 flex-1 flex'>
        <div className='p-6 md:p-8 flex-1'>{children}</div>
        {rightPanel && <RightPanel user={user} profileCompletion={75} />}
      </main>
    </div>
  )
}
