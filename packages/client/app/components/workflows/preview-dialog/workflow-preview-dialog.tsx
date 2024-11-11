import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@data-river/shared/ui/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@data-river/shared/ui/components/ui/tabs";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Link } from "@remix-run/react";
import { ArrowUpRight, Copy, Share2, Star, X } from "lucide-react";
import { ScrollArea } from "@data-river/shared/ui/components/ui/scroll-area";
import { WorkflowOverview } from "./overview/workflow-overview";
import { AnalyticsView } from "./analytics/analytics-view";
import Editor from "@data-river/editor";
import type { WorkflowData, WorkflowAnalytics } from "./types";
import { ActionButtons } from "./action-buttons";

interface WorkflowPreviewDialogProps {
  workflow: WorkflowData;
  analytics?: WorkflowAnalytics;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkflowPreviewDialog({
  workflow,
  analytics,
  open,
  onOpenChange,
}: WorkflowPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl lg:h-[80vh]" showCloseButton={false}>
        <Tabs defaultValue="overview" className="h-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <ActionButtons workflowId={workflow.id} />
          </div>

          <TabsContent value="overview" className="mt-0 h-[calc(100%-60px)]">
            <ScrollArea className="h-full pr-4">
              <WorkflowOverview workflow={workflow} analytics={analytics} />
            </ScrollArea>
          </TabsContent>

          <TabsContent value="preview" className="mt-0 h-[calc(100%-60px)]">
            <div className="h-full border rounded-lg overflow-hidden">
              <Editor />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0 h-[calc(100%-60px)]">
            <ScrollArea className="h-full pr-4">
              <AnalyticsView analytics={analytics} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
