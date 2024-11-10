import { GitFork, Globe, Play, Workflow as WorkflowIcon } from "lucide-react";
import { StatsCard } from "./stats-card";

type WorkflowStats = {
  totalWorkflows: number;
  publicWorkflows: number;
  totalRuns: number;
  totalRemixes: number;
};

export function WorkflowStats(stats: WorkflowStats) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <StatsCard
        title="Total Workflows"
        value={stats.totalWorkflows}
        icon={<WorkflowIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Public Workflows"
        value={stats.publicWorkflows}
        icon={<Globe className="h-4 w-4 text-muted-foreground" />}
        description={`${stats.totalWorkflows - stats.publicWorkflows} private workflows`}
      />
      <StatsCard
        title="Total Runs"
        value={stats.totalRuns}
        icon={<Play className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Remixes"
        value={stats.totalRemixes}
        icon={<GitFork className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
