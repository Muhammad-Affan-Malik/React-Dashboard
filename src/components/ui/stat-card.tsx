import { type LucideIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./card"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  cardGradient?: string
  borderColor?: string
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor = "text-muted-foreground", 
  iconBg = "bg-muted",
  cardGradient = "from-muted/5 to-muted/0",
  borderColor = "border-border/50"
}: StatCardProps) {
  return (
    <Card className={`${borderColor} bg-gradient-to-br ${cardGradient} bg-card transition-all duration-300 hover:shadow-xl hover:shadow-${iconColor}/10 hover:-translate-y-1 hover:scale-[1.02]`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-card-foreground">
          {title}
        </CardTitle>
        <div className={`rounded-xl p-2.5 ${iconBg} transition-all hover:scale-110 shadow-sm`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-card-foreground mb-2">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <span className="text-success font-medium">↗</span>
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

