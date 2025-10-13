import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
  { date: "Mon", visitors: 2400, pageViews: 4800 },
  { date: "Tue", visitors: 3200, pageViews: 6100 },
  { date: "Wed", visitors: 2800, pageViews: 5400 },
  { date: "Thu", visitors: 3900, pageViews: 7200 },
  { date: "Fri", visitors: 4200, pageViews: 8100 },
  { date: "Sat", visitors: 3100, pageViews: 5900 },
  { date: "Sun", visitors: 2700, pageViews: 5200 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "#8b5cf6", // Violet purple
  },
  pageViews: {
    label: "Page Views",
    color: "#06b6d4", // Cyan blue
  },
} satisfies ChartConfig

export function AnalyticsChart() {
  return (
    <Card className="border-purple/20 bg-gradient-to-br from-purple/5 to-info/5 bg-card shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-card-foreground text-xl flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-purple animate-pulse"></div>
          Weekly Analytics
        </CardTitle>
        <CardDescription className="text-sm">
          Visitors and page views this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <ChartContainer config={chartConfig} className="h-[300px] w-full min-w-[320px] sm:min-w-[400px]">
            <AreaChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <defs>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="pageViews"
              stroke="#06b6d4"
              fill="url(#fillPageViews)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#8b5cf6"
              fill="url(#fillVisitors)"
              strokeWidth={2}
            />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

