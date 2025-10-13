import { cn } from "@/lib/utils"

interface ProgressBarProps {
  label: string
  value: string | number
  progress: number
  description: string
  className?: string
  gradient?: string
}

export function ProgressBar({ label, value, progress, description, className, gradient = "from-primary to-primary/80" }: ProgressBarProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-card-foreground">{label}</div>
        <div className="text-sm font-bold text-card-foreground">{value}</div>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div 
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500 shadow-sm`}
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

