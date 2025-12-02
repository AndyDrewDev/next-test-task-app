import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided')
  }
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return { dayOfWeek, rest: `${day} ${month} ${year}` }
}

export function formatDueDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  return `${day} ${month}`
}

export function getInitials(name: string): string {
  if (!name || !name.trim()) {
    return ''
  }
  return name
    .split(' ')
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength).trim() + '...'
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

export function calcTaskCompletionPercent(
  tasks: { status: string }[] | undefined
): number {
  if (!tasks || tasks.length === 0) return 0
  const completed = tasks.filter((t) => t.status === 'completed').length
  return Math.round((completed / tasks.length) * 100)
}
