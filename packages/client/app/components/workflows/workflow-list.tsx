import { WorkflowCard } from "./workflow-card";

interface WorkflowListProps {
  workflows: Array<{
    id: string;
    name: string;
    description: string | null;
    updated_at: string;
    remix_count: number | null;
    total_runs?: number;
    workflow_interests: { interest_id: string }[];
  }>;
  analytics?: Record<
    string,
    {
      hourly_stats: Array<{
        hour: string;
        total_runs: number;
        successful_runs: number;
        failed_runs: number;
        avg_duration_ms: number;
      }>;
    }
  >;
}

export function WorkflowList({ workflows, analytics }: WorkflowListProps) {
  return (
    <div className="space-y-4">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          workflow={workflow}
          analytics={analytics?.[workflow.id]}
        />
      ))}
    </div>
  );
}
