import { Bell, ShoppingBag, CreditCard, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

const notifications = [
  {
    id: 1,
    title: "New order received",
    description: "Order #1234 from John Doe",
    time: "5 minutes ago",
    unread: true,
    icon: ShoppingBag,
    color: "from-purple to-pink",
    bgColor: "bg-purple/10",
    iconColor: "text-purple",
  },
  {
    id: 2,
    title: "Payment confirmed",
    description: "Payment of $299 received",
    time: "1 hour ago",
    unread: true,
    icon: CreditCard,
    color: "from-success to-success/80",
    bgColor: "bg-success/10",
    iconColor: "text-success",
  },
  {
    id: 3,
    title: "New user registered",
    description: "Jane Smith joined your platform",
    time: "3 hours ago",
    unread: false,
    icon: UserPlus,
    color: "from-info to-cyan",
    bgColor: "bg-info/10",
    iconColor: "text-info",
  },
]

export function Notifications() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted/50 transition-all text-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-destructive to-orange text-[10px] font-bold text-white shadow-lg shadow-destructive/50 animate-pulse" >
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 pb-3">
          <h4 className="text-sm font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {unreadCount} new
            </span>
          )}
        </div>
        <Separator />
        <div className="max-h-[400px] overflow-auto">
          {notifications.map((notification, index) => {
            const Icon = notification.icon
            return (
              <div key={notification.id}>
                <div className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-all cursor-pointer">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${notification.bgColor} shadow-sm`}>
                    <Icon className={`h-4 w-4 ${notification.iconColor}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  {notification.unread && (
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${notification.color} mt-2 shadow-sm`} />
                  )}
                </div>
                {index < notifications.length - 1 && <Separator />}
              </div>
            )
          })}
        </div>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-center text-sm hover:bg-muted/50">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

