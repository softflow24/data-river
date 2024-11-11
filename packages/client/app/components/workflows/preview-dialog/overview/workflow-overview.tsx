import { Card } from "@data-river/shared/ui/components/ui/card";
import { Badge } from "@data-river/shared/ui/components/ui/badge";
import { Workflow } from "lucide-react";
import { QuickStats } from "./quick-stats";
import { PerformanceOverview } from "./performance-overview";
import { WorkflowSidebar } from "./workflow-sidebar";
import { RecentEvents } from "./recent-events";
import type { WorkflowData, WorkflowAnalytics } from "../types";

interface WorkflowOverviewProps {
  workflow: WorkflowData;
  analytics?: WorkflowAnalytics;
}

export function WorkflowOverview({
  workflow,
  analytics,
}: WorkflowOverviewProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Workflow className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold mb-1">{workflow.name}</h2>
              {workflow.description && (
                <p className="text-muted-foreground">{workflow.description}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {workflow.workflow_interests.map((interest) => (
              <Badge key={interest.interest_id} variant="secondary">
                {interest.interest_id}
              </Badge>
            ))}
          </div>
        </Card>

        <QuickStats workflow={workflow} />
        {analytics && <PerformanceOverview analytics={analytics} />}
      </div>

      <div className="space-y-4">
        <WorkflowSidebar workflow={workflow} analytics={analytics} />
        <RecentEvents />
      </div>
    </div>
  );
}
