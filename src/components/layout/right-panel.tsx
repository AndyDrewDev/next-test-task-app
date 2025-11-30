import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CircularProgress } from '@/components/ui/circular-progress'
import { Separator } from '@/components/ui/separator'
import { User, defaultUser } from '@/types'
import { toast } from 'sonner'

interface RightPanelProps {
  user?: User
  profileCompletion?: number
}

export function RightPanel({ user, profileCompletion = 75 }: RightPanelProps) {
  const userData = user ?? defaultUser

  const handleLogout = () => {
    toast.info('Logged out', {
      description: 'You have been logged out',
    })
  }

  return (
    <aside className='hidden md:flex min-h-screen w-[312px] flex-shrink-0 flex-col bg-white py-10 px-7'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl font-medium text-heading'>My Profile</h2>
        <p className='text-sm text-success'>
          {profileCompletion}% completed your profile
        </p>
      </div>

      <div className='flex flex-col items-center mt-9'>
        <div className='relative size-[100px]'>
          <CircularProgress value={profileCompletion} />
          {/* Avatar in center */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <Avatar className='size-20'>
              {userData.avatar && (
                <AvatarImage src={userData.avatar} alt={userData.name} />
              )}
              <AvatarFallback className='bg-neutral' />
            </Avatar>
          </div>
        </div>

        <span className='mt-4 text-base font-medium text-heading'>
          {userData.name}
        </span>

        <span className='mt-[10px] text-sm text-subtle'>
          {userData.role || 'Member'}
        </span>
      </div>

      <Separator className='my-3 bg-separator' />

      <div className='flex-1' />

      <Button onClick={handleLogout} className='w-full h-[35px] rounded-[4px] bg-danger text-xs font-bold hover:bg-danger-hover active:bg-danger-active'>
        Logout
      </Button>
    </aside>
  )
}
