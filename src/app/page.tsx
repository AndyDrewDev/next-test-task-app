import { MainLayout, PageHeader } from '@/components/layout'

// Temporary user data
const user = {
  name: 'User R.',
  email: 'test-mail@email.com',
  role: 'Developer at White Digital',
}

export default function Home() {
  return (
    <MainLayout user={user}>
      <PageHeader title='My Tasks' />

      {/* Task columns: vertical stack on mobile, horizontal scroll on md+ */}
      <div className='mt-8 flex flex-col gap-8 md:flex-row md:overflow-x-auto'>
        <div className='space-y-4 md:min-w-[260px] md:flex-1'>
          <h2 className='text-base font-medium text-heading'>To do (3)</h2>
          <div className='flex flex-col gap-6'>
            <div className='h-54 rounded-lg bg-white' />
            <div className='h-54 rounded-lg bg-white' />
            <div className='h-54 rounded-lg bg-white' />
          </div>
        </div>
        <div className='space-y-4 md:min-w-[260px] md:flex-1'>
          <h2 className='text-base font-medium text-heading'>
            In progress (2)
          </h2>
          <div className='flex flex-col gap-6'>
            <div className='h-54 rounded-lg bg-white' />
            <div className='h-54 rounded-lg bg-white' />
            <div className='h-54 rounded-lg dashed-border bg-surface' />
          </div>
        </div>
        <div className='space-y-4 md:min-w-[260px] md:flex-1'>
          <h2 className='text-base font-medium text-heading'>Review (1)</h2>
          <div className='flex flex-col gap-6'>
            <div className='h-54 rounded-lg bg-white' />
            <div className='h-54 rounded-lg dashed-border bg-surface' />
            <div className='h-54 rounded-lg dashed-border bg-surface' />
          </div>{' '}
        </div>
        <div className='space-y-4 md:min-w-[260px] md:flex-1'>
          <h2 className='text-base font-medium text-heading'>Completed (1)</h2>
          <div className='flex flex-col gap-6'>
            <div className='h-54 rounded-lg bg-white' />
            <div className='h-54 rounded-lg dashed-border bg-surface' />
            <div className='h-54 rounded-lg dashed-border bg-surface' />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
