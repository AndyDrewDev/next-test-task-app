'use client'

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { useProfileSheet } from '@/hooks'
import { User } from '@/types'
import { ProfileContent } from './profile-content'

interface ProfileSheetProps {
  user?: User
}

export function ProfileSheet({ user }: ProfileSheetProps) {
  const { isOpen, setIsOpen } = useProfileSheet()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side='right' className='w-[312px] p-0'>
        <SheetTitle className='sr-only'>User Profile</SheetTitle>
        <SheetDescription className='sr-only'>
          View and manage your profile
        </SheetDescription>
        <ProfileContent user={user} onLogout={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
