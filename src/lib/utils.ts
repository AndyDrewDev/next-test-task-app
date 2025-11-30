import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
