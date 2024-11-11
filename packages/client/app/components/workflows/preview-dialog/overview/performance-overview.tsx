import { Card } from "@data-river/shared/ui/components/ui/card";
import { Progress } from "@data-river/shared/ui/components/ui/progress";
import { formatDuration } from "../utils";
import type { WorkflowAnalytics } from "../types";

interface PerformanceOverviewProps {
  analytics: WorkflowAnalytics;
}

export function PerformanceOverview({ analytics }: PerformanceOverviewProps) {
  const successRate =
    (analytics.hourly_stats.reduce(
      (acc, stat) => acc + stat.successful_runs,
      0,
    ) /
      analytics.hourly_stats.reduce((acc, stat) => acc + stat.total_runs, 0)) *
    100;

  const avgDuration =
    analytics.hourly_stats.reduce(
      (acc, stat) => acc + stat.avg_duration_ms,
      0,
    ) / analytics.hourly_stats.length;

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Performance Overview</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Success Rate</span>
            <span className="font-medium">{successRate.toFixed(1)}%</span>
          </div>
          <Progress value={successRate} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="text-sm mb-1">Average Duration</div>
          <div className="text-2xl font-bold">
            {formatDuration(avgDuration)}
          </div>
          <div className="text-sm text-muted-foreground">per execution</div>
        </div>
      </div>
    </Card>
  );
}
