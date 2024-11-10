import { WorkflowCard } from "./workflow-card";
import type { WorkflowCardProps } from "./workflow-card";

interface WorkflowGridProps {
  workflows: WorkflowCardProps["workflow"][];
}

export function WorkflowGrid({ workflows }: WorkflowGridProps) {
  if (!workflows?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No workflows found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}
