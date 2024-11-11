import { Card } from "@data-river/shared/ui/components/ui/card";
import { Play, GitFork, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { WorkflowData } from "../types";

interface QuickStatsProps {
  workflow: WorkflowData;
}

export function QuickStats({ workflow }: QuickStatsProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Quick Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        <StatItem
          icon={<Play className="w-4 h-4" />}
          label="Total Runs"
          value={workflow.total_runs ?? 0}
        />
        <StatItem
          icon={<GitFork className="w-4 h-4" />}
          label="Remixes"
          value={workflow.remix_count ?? 0}
        />
        <StatItem
          icon={<Clock className="w-4 h-4" />}
          label="Last Updated"
          value={formatDistanceToNow(new Date(workflow.updated_at), {
            addSuffix: true,
          })}
        />
      </div>
    </Card>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <div className="p-2 rounded-md bg-background">{icon}</div>
      <div>
        <div className="text-sm font-medium">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
