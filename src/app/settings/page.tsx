import { MainLayout, PageHeader } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const user = {
    name: 'User R.',
    email: 'test-mail@email.com',
    role: 'Developer at White Digital',
  }

  return (
    <MainLayout user={user} rightPanel={true}>
      <PageHeader title='Settings' />

      {/* Settings placeholder */}
      <div className='mt-8 space-y-6'>
        <div className='flex flex-col gap-2'>
          <label className='font-noto text-xs text-label font-semibold leading-[18px]'>
            Name
          </label>
          <Input
            placeholder='Enter name'
            defaultValue='User Random'
            className='font-noto h-14 rounded-lg border-field bg-white px-4 text-base placeholder:text-subtle'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-noto text-xs text-label font-semibold leading-[18px]'>
            Password
          </label>
          <Input
            placeholder='Enter password'
            className='font-noto h-14 rounded-lg border-field bg-white px-4 text-base placeholder:text-subtle'
          />
          <p className='font-noto text-xs text-label leading-[18px]'>
            Your password is between 4 and 12 characters
          </p>
        </div>

        <div className='flex justify-end'>
          <Button className='w-[272px] h-[35px] rounded-[4px] bg-success text-xs font-bold hover:bg-success-hover active:bg-success-active'>
            Save
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
