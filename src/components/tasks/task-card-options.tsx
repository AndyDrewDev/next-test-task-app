'use client'

import { MoreHorizontal, Pencil, Trash2, ArrowRight, Info } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteTask, useUpdateTaskStatus } from '@/hooks'
import { STATUS_OPTIONS, type Task, type TaskStatus } from '@/types'
import { toast } from 'sonner'

interface TaskCardOptionsProps {
  task: Task
  onEdit?: () => void
  onInfo?: () => void
}

export function TaskCardOptions({
  task,
  onEdit,
  onInfo,
}: TaskCardOptionsProps) {
  const deleteTask = useDeleteTask()
  const updateStatus = useUpdateTaskStatus()

  const handleDelete = () => {
    deleteTask.mutate(task.id, {
      onSuccess: () => {
        toast.success('Task deleted')
      },
      onError: () => {
        toast.error('Failed to delete task')
      },
    })
  }

  const handleStatusChange = (status: TaskStatus) => {
    if (status === task.status) return

    updateStatus.mutate(
      { taskId: task.id, status },
      {
        onSuccess: () => {
          toast.success(
            `Moved to "${
              STATUS_OPTIONS.find((s) => s.value === status)?.label
            }"`
          )
        },
        onError: () => {
          toast.error('Failed to update status')
        },
      }
    )
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='w-6 h-6 ml-2 shrink-0 rounded text-subtle hover:bg-surface hover:text-label transition-colors cursor-pointer'
          aria-label='Task options'
        >
          <MoreHorizontal className='size-6' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuItem onClick={onInfo}>
          <Info className='mr-2' />
          Info
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className='mr-2' />
          Edit
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ArrowRight className='mr-2' />
            Move to
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {STATUS_OPTIONS.map((status) => (
              <DropdownMenuItem
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                disabled={status.value === task.status}
                className={status.value === task.status ? 'opacity-50' : ''}
              >
                {status.label}
                {status.value === task.status && (
                  <span className='ml-auto text-xs text-subtle'>(current)</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          destructive
          onClick={handleDelete}
          disabled={deleteTask.isPending}
        >
          <Trash2 className='mr-2' />
          {deleteTask.isPending ? 'Deleting...' : 'Delete'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
