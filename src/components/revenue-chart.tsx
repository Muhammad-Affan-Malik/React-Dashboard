import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", revenue: 4500, expenses: 2400 },
  { month: "Feb", revenue: 5200, expenses: 2800 },
  { month: "Mar", revenue: 4800, expenses: 2600 },
  { month: "Apr", revenue: 6100, expenses: 3200 },
  { month: "May", revenue: 5800, expenses: 3000 },
  { month: "Jun", revenue: 7200, expenses: 3800 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#16a34a", // Green
  },
  expenses: {
    label: "Expenses", 
    color: "#0891b2", // Cyan
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <Card className="border-success/20 bg-gradient-to-br from-success/5 to-orange/5 bg-card shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-card-foreground text-xl flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
          Revenue Overview
        </CardTitle>
        <CardDescription className="text-sm">
          Monthly revenue and expenses comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <ChartContainer config={chartConfig} className="h-[300px] w-full min-w-[320px] sm:min-w-[400px]">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                fill="var(--color-expenses)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

