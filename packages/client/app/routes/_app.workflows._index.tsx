import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { createClient } from "~/utils/supabase.server";
import { WorkflowList } from "../components/workflows/workflow-list";
import { WorkflowFilters } from "../components/workflows/workflow-filters";
import { Plus } from "lucide-react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Link } from "@remix-run/react";
import {
  parseSearchParams,
  stringifyFilters,
  type WorkflowFilters as WorkflowFiltersSchema,
} from "~/schemas/workflow-filters";
import { useCallback } from "react";
import { WorkflowStats } from "~/components/workflows/workflow-stats";
import { getFilteredWorkflows } from "~/services/workflow.server";
import { MOCK_WORKFLOWS } from "~/data/mock-workflows";
import { getWorkflowTags } from "~/services/tags.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const isMock = url.searchParams.get("mock") === "true";
  const filters = parseSearchParams(url.searchParams);

  if (isMock) {
    return json({
      workflows: MOCK_WORKFLOWS,
      stats: {
        totalWorkflows: 12,
        publicWorkflows: 5,
        totalRuns: 1234,
        totalRemixes: 45,
      },
      filters,
      tags: [
        { id: "automation", count: 9, color: "bg-blue" },
        { id: "api", count: 5, color: "bg-green" },
      ],
    });
  }

  const { supabase } = await createClient(request);
  const [workflows, tags] = await Promise.all([
    getFilteredWorkflows(supabase, filters),
    getWorkflowTags(supabase),
  ]);

  const stats = {
    totalWorkflows: workflows.length,
    publicWorkflows: workflows.filter((w) => w.is_public).length,
    totalRuns: workflows.reduce(
      (acc, w) => acc + (w.workflow_total_runs?.[0]?.total_runs ?? 0),
      0,
    ),
    totalRemixes: workflows.reduce((acc, w) => acc + (w.remix_count ?? 0), 0),
  };

  return json({ workflows, stats, filters, tags });
}

export default function MyWorkflowsPage() {
  const { workflows, stats, filters, tags } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFiltersChange = useCallback(
    (newFilters: Partial<WorkflowFiltersSchema>) => {
      const params = stringifyFilters({
        ...filters,
        ...newFilters,
      });
      setSearchParams(params);
    },
    [filters, setSearchParams],
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">My Workflows</h1>
              <p className="text-sm text-muted-foreground">
                Manage and monitor your workflow collection
              </p>
            </div>
            <Button asChild>
              <Link to="/editor" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Workflow
              </Link>
            </Button>
          </div>

          <WorkflowStats {...stats} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <WorkflowFilters
              onChange={handleFiltersChange}
              initialFilters={{
                search: filters.search,
                status: { public: filters.public },
                runRange: filters.runRange,
                remixRange: filters.remixRange,
                tags: filters.tags,
                sort: filters.sort,
                dateRange: {
                  from: filters.dateFrom
                    ? new Date(filters.dateFrom)
                    : undefined,
                  to: filters.dateTo ? new Date(filters.dateTo) : undefined,
                },
              }}
              availableTags={tags}
            />
          </div>

          {/* Workflow List */}
          <div className="flex-1 border-l border-border/50 pl-6">
            <WorkflowList
              workflows={workflows.map((workflow) => ({
                ...workflow,
                total_runs: workflow.workflow_total_runs?.[0]?.total_runs ?? 0,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
