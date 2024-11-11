import { ScrollArea } from "@data-river/shared/ui/components/ui/scroll-area";
import { SummaryCards } from "./summary-cards";
import { ChartsGrid } from "./charts-grid";
import type { WorkflowAnalytics } from "../types";

interface AnalyticsViewProps {
  analytics?: WorkflowAnalytics;
}

export function AnalyticsView({ analytics }: AnalyticsViewProps) {
  if (!analytics) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No analytics data available
      </div>
    );
  }

  const successRate =
    (analytics.hourly_stats.reduce(
      (acc, stat) => acc + stat.successful_runs,
      0,
    ) /
      analytics.hourly_stats.reduce((acc, stat) => acc + stat.total_runs, 0)) *
    100;

  const failedRuns = analytics.hourly_stats.reduce(
    (acc, stat) => acc + stat.failed_runs,
    0,
  );

  const avgDuration =
    analytics.hourly_stats.reduce(
      (acc, stat) => acc + stat.avg_duration_ms,
      0,
    ) / analytics.hourly_stats.length;

  const totalRuns = analytics.hourly_stats.reduce(
    (acc, stat) => acc + stat.total_runs,
    0,
  );

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4">
        <SummaryCards
          successRate={successRate}
          failedRuns={failedRuns}
          avgDuration={avgDuration}
          totalRuns={totalRuns}
        />
        <ChartsGrid analytics={analytics} />
      </div>
    </ScrollArea>
  );
}
