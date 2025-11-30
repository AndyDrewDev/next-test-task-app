'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { SidebarContent } from './sidebar-content'
import { Logo } from './logo'
import { useState } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { User } from '@/types'

interface MobileNavProps {
  user?: User
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <header className='md:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-white px-4 border-b border-divider'>
        <Logo className='py-0 mb-0' />
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setOpen(true)}
          className='size-9'
        >
          <Menu className='size-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </header>

      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className='w-[220px] p-0'>
          <SheetHeader className='sr-only'>
            <SheetTitle>
              <VisuallyHidden>Navigation Menu</VisuallyHidden>
            </SheetTitle>
            <SheetDescription>
              <VisuallyHidden>Main navigation menu</VisuallyHidden>
            </SheetDescription>
          </SheetHeader>
          <div className='h-screen' onClick={() => setOpen(false)}>
            <SidebarContent user={user} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
