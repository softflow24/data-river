import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { Play, Star, GitFork, Clock, Workflow } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@data-river/shared/ui/components/ui/card";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Badge } from "@data-river/shared/ui/components/ui/badge";

export interface WorkflowCardProps {
  workflow: {
    id: string;
    name: string;
    description: string | null;
    updated_at: string;
    remix_count: number | null;
    total_runs?: number;
    workflow_interests: { interest_id: string }[];
  };
  variant?: "default" | "compact";
}

export function WorkflowCard({
  workflow,
  variant = "default",
}: WorkflowCardProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 transition-colors group">
        <div className="flex items-center gap-4 min-w-0">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <Workflow className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate">{workflow.name}</p>
              <Badge variant="secondary" className="text-xs shrink-0">
                {workflow.workflow_interests[0]?.interest_id}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {workflow.remix_count ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <Play className="h-3 w-3" />
            {workflow.total_runs ?? 0}
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{workflow.name}</h3>
            {workflow.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {workflow.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {workflow.workflow_interests.map((interest) => (
            <Badge key={interest.interest_id} variant="secondary">
              {interest.interest_id}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              {workflow.remix_count ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Play className="h-4 w-4" />
              {workflow.total_runs ?? 0}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDistanceToNow(new Date(workflow.updated_at), {
              addSuffix: true,
            })}
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <Button asChild className="flex-1">
            <Link to={`/editor/${workflow.id}`}>Edit</Link>
          </Button>
          <Button variant="outline" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
