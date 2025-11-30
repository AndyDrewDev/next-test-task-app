'use client'

import { NavLink } from './nav-link'
import { Logo } from './logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DashboardIcon, SettingsIcon } from '@/components/icons'
import { User, defaultUser } from '@/types'

interface SidebarContentProps {
  user?: User
}

export function SidebarContent({ user }: SidebarContentProps) {
  const userData = user ?? defaultUser

  return (
    <div className='flex h-full flex-col py-10 px-7'>
      <Logo />

      {/* Navigation */}
      <nav className='flex flex-col'>
        <NavLink href='/' icon={DashboardIcon}>
          Dashboard
        </NavLink>
        <NavLink href='/settings' icon={SettingsIcon}>
          Settings
        </NavLink>
      </nav>

      {/* Spacer */}
      <div className='flex-1' />

      {/* User Info */}
      <div className='flex items-center gap-3'>
        <Avatar className='size-8'>
          {userData.avatar && (
            <AvatarImage src={userData.avatar} alt={userData.name} />
          )}
          <AvatarFallback className='bg-success text-xs text-white'>
            {userData.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <span className='text-xs font-medium text-black'>
            {userData.name}
          </span>
          <span className='text-[10px] text-subtle'>{userData.email}</span>
        </div>
      </div>
    </div>
  )
}
