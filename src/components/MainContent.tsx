import { ArrowUpRight, Users, DollarSign, ShoppingCart, Activity } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { StatCard } from "./ui/stat-card"
import { ActivityItem } from "./ui/activity-item"
import { ProgressBar } from "./ui/progress-bar"
import { RevenueChart } from "./revenue-chart"
import { AnalyticsChart } from "./analytics-chart"

const statsCards = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
    iconColor: "text-success",
    iconBg: "bg-success/10",
    cardGradient: "from-success/5 to-success/0",
    borderColor: "border-success/20",
  },
  {
    title: "Active Users",
    value: "+2,350",
    change: "+180.1% from last month",
    icon: Users,
    iconColor: "text-info",
    iconBg: "bg-info/10",
    cardGradient: "from-info/5 to-info/0",
    borderColor: "border-info/20",
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19% from last month",
    icon: ShoppingCart,
    iconColor: "text-purple",
    iconBg: "bg-purple/10",
    cardGradient: "from-purple/5 to-purple/0",
    borderColor: "border-purple/20",
  },
  {
    title: "Active Now",
    value: "+573",
    change: "+201 since last hour",
    icon: Activity,
    iconColor: "text-orange",
    iconBg: "bg-orange/10",
    cardGradient: "from-orange/5 to-orange/0",
    borderColor: "border-orange/20",
  },
]

const recentActivities = [
  { user: "Olivia Martin", action: "made a purchase", time: "2 minutes ago", amount: "$59.00" },
  { user: "Jackson Lee", action: "subscribed", time: "5 minutes ago", amount: "$39.00" },
  { user: "Isabella Nguyen", action: "upgraded plan", time: "10 minutes ago", amount: "$99.00" },
  { user: "William Kim", action: "made a purchase", time: "15 minutes ago", amount: "$29.00" },
  { user: "Sofia Davis", action: "subscribed", time: "20 minutes ago", amount: "$49.00" },
]

export function MainContent() {
  // Main content component without props
  return (
    <main className="min-h-screen w-full bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Stats Cards Grid */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statsCards.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBg={stat.iconBg}
              cardGradient={stat.cardGradient}
              borderColor={stat.borderColor}
            />
          ))}
        </div>

        {/* Interactive Charts */}
        <div className="mb-10 grid gap-6 grid-cols-1 lg:grid-cols-2">
          <RevenueChart />
          <AnalyticsChart />
        </div>

        {/* Recent Activities and Analytics */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Recent Activities */}
          <Card className="col-span-full lg:col-span-4 border-cyan/20 bg-gradient-to-br from-cyan/5 to-info/5 bg-card shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-card-foreground text-xl flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan animate-pulse"></div>
                Recent Activities
              </CardTitle>
              <CardDescription className="text-sm">
                You have {recentActivities.length} activities this session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3.5">
                {recentActivities.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    user={activity.user}
                    action={activity.action}
                    time={activity.time}
                    amount={activity.amount}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales Summary */}
          <Card className="col-span-full lg:col-span-3 border-pink/20 bg-gradient-to-br from-pink/5 to-accent/5 bg-card shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-card-foreground text-xl flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink animate-pulse"></div>
                Sales Summary
              </CardTitle>
              <CardDescription className="text-sm">
                Your sales performance this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-7">
              <ProgressBar
                label="Total Sales"
                value="$24,500"
                progress={75}
                description="75% of monthly goal"
                gradient="from-success to-success/80"
              />

              <ProgressBar
                label="New Customers"
                value="1,234"
                progress={60}
                description="60% increase from last month"
                gradient="from-info to-cyan"
              />

              <ProgressBar
                label="Retention Rate"
                value="89%"
                progress={89}
                description="Above industry average"
                gradient="from-blue-500 to-blue-600"
              />

              <Button className="w-full mt-2 bg-card text-foreground border border-border hover:bg-muted hover:text-foreground shadow-md hover:shadow-lg transition-all hover:scale-[1.02]" size="sm" variant="outline">
                View Full Report
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

