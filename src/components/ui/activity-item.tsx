interface ActivityItemProps {
  user: string
  action: string
  time: string
  amount: string
}

const getGradientForAction = (action: string) => {
  if (action.includes("purchase")) return "from-success to-success/80"
  if (action.includes("subscribed")) return "from-info to-cyan"
  if (action.includes("upgraded")) return "from-orange-500 to-orange-600"
  return "from-primary to-primary/80"
}

const getBorderColorForAction = (action: string) => {
  if (action.includes("purchase")) return "border-success/20 hover:border-success/40"
  if (action.includes("subscribed")) return "border-info/20 hover:border-info/40"
  if (action.includes("upgraded")) return "border-orange-500/20 hover:border-orange-500/40"
  return "border-border/50 hover:border-border"
}

export function ActivityItem({ user, action, time, amount }: ActivityItemProps) {
  const gradient = getGradientForAction(action)
  const borderColor = getBorderColorForAction(action)
  
  return (
    <div className={`flex items-center justify-between rounded-xl border ${borderColor} p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]`}>
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white font-semibold shadow-md`}>
          {user.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold leading-none text-card-foreground mb-1.5">
            {user}
          </p>
          <p className="text-sm text-muted-foreground">
            {action} • {time}
          </p>
        </div>
      </div>
      <div className="font-bold text-card-foreground text-base">{amount}</div>
    </div>
  )
}

