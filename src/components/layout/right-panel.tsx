'use client'

import { User } from '@/types'
import { ProfileContent } from './profile-content'

interface RightPanelProps {
  user?: User
}

export function RightPanel({ user }: RightPanelProps) {
  return (
    <aside className='hidden md:flex min-h-screen w-[312px] flex-shrink-0 flex-col bg-white'>
      <ProfileContent user={user} />
    </aside>
  )
}
