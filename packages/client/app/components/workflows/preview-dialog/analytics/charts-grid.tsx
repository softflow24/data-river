import { Card } from "@data-river/shared/ui/components/ui/card";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { formatDuration } from "../utils";
import type { WorkflowAnalytics } from "../types";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@data-river/shared/ui/components/ui/chart";

const runsConfig = {
  successful: {
    label: "Successful",
    color: "hsl(var(--chart-1))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const durationConfig = {
  duration: {
    label: "Duration",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const pieConfig = {
  success: {
    label: "Success",
    color: "hsl(var(--chart-1))",
  },
  failure: {
    label: "Failure",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface ChartsGridProps {
  analytics: WorkflowAnalytics;
}

export function ChartsGrid({ analytics }: ChartsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <RunsOverTimeChart data={analytics.hourly_stats} />
      <DurationDistributionChart data={analytics.hourly_stats} />
      <SuccessFailureChart data={analytics.hourly_stats} />
      <PerformanceTrendsChart data={analytics.hourly_stats} />
    </div>
  );
}

function RunsOverTimeChart({
  data,
}: {
  data: WorkflowAnalytics["hourly_stats"];
}) {
  console.log(data);
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-6">Runs Over Time</h3>
      <ChartContainer config={runsConfig}>
        <AreaChart
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="hour"
            tickFormatter={(value) => format(new Date(value), "HH:mm")}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            labelFormatter={(value) => format(new Date(value), "MMM d, HH:mm")}
            content={<ChartTooltipContent />}
          />
          <defs>
            <linearGradient id="fillSuccessful" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-5))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-5))"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="successful_runs"
            name={runsConfig.successful.label}
            type="natural"
            fill="url(#fillSuccessful)"
            fillOpacity={0.4}
            stroke="hsl(var(--chart-2))"
          />
          <Area
            dataKey="failed_runs"
            name={runsConfig.failed.label}
            type="natural"
            fill="url(#fillFailed)"
            fillOpacity={0.4}
            stroke="hsl(var(--chart-5))"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}

function DurationDistributionChart({
  data,
}: {
  data: WorkflowAnalytics["hourly_stats"];
}) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-6">Duration Distribution</h3>
      <ChartContainer config={durationConfig}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            tickFormatter={(value) => format(new Date(value), "HH:mm")}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="avg_duration_ms"
            fill="hsl(var(--chart-3))"
            name="Average"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}

function SuccessFailureChart({
  data,
}: {
  data: WorkflowAnalytics["hourly_stats"];
}) {
  const totalSuccessful = data.reduce(
    (acc, stat) => acc + stat.successful_runs,
    0,
  );
  const totalFailed = data.reduce((acc, stat) => acc + stat.failed_runs, 0);

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-6">Success vs Failure</h3>
      <ChartContainer config={pieConfig}>
        <PieChart>
          <Pie
            data={[
              {
                name: "success",
                value: totalSuccessful,
                fill: "hsl(var(--chart-2))",
              },
              {
                name: "failure",
                value: totalFailed,
                fill: "hsl(var(--chart-5))",
              },
            ]}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            nameKey="name"
            dataKey="value"
          >
            <Cell fill="hsl(var(--chart-2))" />
            <Cell fill="hsl(var(--chart-5))" />
          </Pie>
          <ChartLegend
            content={<ChartLegendContent />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>
    </Card>
  );
}

function PerformanceTrendsChart({
  data,
}: {
  data: WorkflowAnalytics["hourly_stats"];
}) {
  const maxDuration = Math.max(...data.map((s) => s.avg_duration_ms));

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-6">Performance Trends</h3>
      <div className="space-y-4">
        {data.slice(0, 5).map((stat) => (
          <div key={stat.hour} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{format(new Date(stat.hour), "MMM d, HH:mm")}</span>
              <span className="font-medium">
                {formatDuration(stat.avg_duration_ms)}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all"
                style={{
                  width: `${(stat.avg_duration_ms / maxDuration) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
