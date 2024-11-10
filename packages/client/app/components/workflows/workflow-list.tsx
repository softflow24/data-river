import { WorkflowCard } from "./workflow-card";
import type { WorkflowCardProps } from "./workflow-card";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@remix-run/react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Workflow } from "lucide-react";

interface WorkflowListProps {
  workflows: WorkflowCardProps["workflow"][];
}

export function WorkflowList({ workflows }: WorkflowListProps) {
  if (!workflows?.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <Workflow className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-1">No workflows found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first workflow
        </p>
        <Button asChild className="mt-4">
          <Link to="/editor">Create Workflow</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="grid gap-4">
        {workflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <WorkflowCard workflow={workflow} />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
