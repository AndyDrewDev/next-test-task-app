const columnTitles = ['To do', 'In progress', 'Review', 'Completed']

export function BoardPlaceholder() {
  return (
    <div className='mt-8 flex flex-col gap-6 md:flex-row md:gap-8 md:overflow-x-auto'>
      {columnTitles.map((title) => (
        <div key={title} className='space-y-4 md:min-w-[260px] md:flex-1'>
          <h2 className='text-base font-medium text-heading'>{title}</h2>
          <div className='flex flex-col gap-6'>
            <div className='md:min-h-[216px] rounded-[8px] dashed-border animate-pulse bg-neutral-200' />
            <div className='md:min-h-[216px] rounded-[8px] dashed-border animate-pulse bg-neutral-200' />
            <div className='md:min-h-[216px] rounded-[8px] dashed-border animate-pulse bg-neutral-200' />
          </div>
        </div>
      ))}
    </div>
  )
}
