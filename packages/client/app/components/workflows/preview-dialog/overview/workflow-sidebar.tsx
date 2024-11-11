import { Card } from "@data-river/shared/ui/components/ui/card";
import { Badge } from "@data-river/shared/ui/components/ui/badge";
import { Separator } from "@data-river/shared/ui/components/ui/separator";
import { format } from "date-fns";
import type { WorkflowData, WorkflowAnalytics } from "../types";

interface WorkflowSidebarProps {
  workflow: WorkflowData;
  analytics?: WorkflowAnalytics;
}

export function WorkflowSidebar({ workflow, analytics }: WorkflowSidebarProps) {
  const successRate = analytics
    ? (analytics.hourly_stats.reduce(
        (acc, stat) => acc + stat.successful_runs,
        0,
      ) /
        analytics.hourly_stats.reduce(
          (acc, stat) => acc + stat.total_runs,
          0,
        )) *
      100
    : 0;

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Workflow Details</h3>
        <div className="space-y-4">
          <DetailItem
            label="Created"
            value={format(new Date(workflow.updated_at), "PPP")}
          />
          <DetailItem
            label="Last Run"
            value={
              analytics?.hourly_stats[0]?.hour
                ? format(new Date(analytics.hourly_stats[0].hour), "PPP 'at' p")
                : "Never"
            }
          />
          <DetailItem
            label="Status"
            value={
              <Badge variant="outline" className="font-normal">
                Active
              </Badge>
            }
          />
          <Separator />
          <DetailItem
            label="Success Rate"
            value={`${successRate.toFixed(1)}%`}
          />
          <DetailItem label="Total Runs" value={workflow.total_runs ?? 0} />
          <DetailItem label="Remixes" value={workflow.remix_count ?? 0} />
        </div>
      </Card>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
