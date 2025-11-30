interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
}

export function CircularProgress({
  value,
  size = 100,
  strokeWidth = 3,
  color = 'var(--success)',
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <svg className='size-full -rotate-90' viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill='none'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className='transition-all duration-500'
      />
    </svg>
  )
}
