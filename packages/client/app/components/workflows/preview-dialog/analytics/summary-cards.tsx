import { Card } from "@data-river/shared/ui/components/ui/card";
import { Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { formatDuration } from "../utils";

interface SummaryCardsProps {
  successRate: number;
  failedRuns: number;
  avgDuration: number;
  totalRuns: number;
}

export function SummaryCards({
  successRate,
  failedRuns,
  avgDuration,
  totalRuns,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-green-500/10">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Failed Runs</div>
            <div className="text-2xl font-bold">{failedRuns}</div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Avg Duration</div>
            <div className="text-2xl font-bold">
              {formatDuration(avgDuration)}
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Runs</div>
            <div className="text-2xl font-bold">{totalRuns}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
