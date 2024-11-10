import { WorkflowCard } from "./workflow-card";
import type { WorkflowCardProps } from "./workflow-card";

interface WorkflowListProps {
  workflows: WorkflowCardProps["workflow"][];
}

export function WorkflowList({ workflows }: WorkflowListProps) {
  if (!workflows?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No workflows found
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}
