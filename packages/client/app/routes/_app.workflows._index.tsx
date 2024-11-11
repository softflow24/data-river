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

// Update the mock data to be keyed by workflow ID
const MOCK_ANALYTICS: Record<
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
> = {
  // Mock data for each workflow
  "1": {
    hourly_stats: Array.from({ length: 24 }, (_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - i);

      const total_runs = Math.floor(Math.random() * 20) + 5;
      const failed_runs = Math.floor(Math.random() * (total_runs * 0.3));

      return {
        hour: date.toISOString(),
        total_runs,
        successful_runs: total_runs - failed_runs,
        failed_runs,
        avg_duration_ms: Math.floor(Math.random() * 10000) + 1000,
      };
    }).reverse(),
  },
  // Add more mock data for other workflows if needed
};

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
      analytics: MOCK_ANALYTICS,
    });
  }

  const { supabase } = await createClient(request);
  const [workflows, tags] = await Promise.all([
    getFilteredWorkflows(supabase, filters),
    getWorkflowTags(supabase),
  ]);

  // Load analytics data for each workflow
  const analyticsData = await Promise.all(
    workflows.map(async (workflow) => {
      const { data: hourlyStats } = await supabase
        .from("workflow_runs")
        .select(
          `
          id,
          workflow_id,
          status,
          started_at,
          completed_at,
          duration_ms
        `,
        )
        .eq("workflow_id", workflow.id)
        .gte(
          "started_at",
          new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        )
        .order("started_at", { ascending: true });

      // Group by hour and calculate stats
      const hourlyMap = new Map<
        string,
        {
          total_runs: number;
          successful_runs: number;
          failed_runs: number;
          durations: number[];
        }
      >();

      hourlyStats?.forEach((run) => {
        const hour =
          new Date(run.started_at).toISOString().slice(0, 13) + ":00:00.000Z";
        const current = hourlyMap.get(hour) || {
          total_runs: 0,
          successful_runs: 0,
          failed_runs: 0,
          durations: [],
        };

        current.total_runs++;
        if (run.status === "success") {
          current.successful_runs++;
        } else {
          current.failed_runs++;
        }
        current.durations.push(run.duration_ms);

        hourlyMap.set(hour, current);
      });

      // Convert to array and calculate averages
      const hourly_stats = Array.from(hourlyMap.entries()).map(
        ([hour, stats]) => ({
          hour,
          total_runs: stats.total_runs,
          successful_runs: stats.successful_runs,
          failed_runs: stats.failed_runs,
          avg_duration_ms: Math.round(
            stats.durations.reduce((a, b) => a + b, 0) / stats.durations.length,
          ),
        }),
      );

      return [workflow.id, { hourly_stats }] as const;
    }),
  );

  const analytics = Object.fromEntries(analyticsData);

  const stats = {
    totalWorkflows: workflows.length,
    publicWorkflows: workflows.filter((w) => w.is_public).length,
    totalRuns: workflows.reduce(
      (acc, w) => acc + (w.workflow_total_runs?.[0]?.total_runs ?? 0),
      0,
    ),
    totalRemixes: workflows.reduce((acc, w) => acc + (w.remix_count ?? 0), 0),
  };

  return json({ workflows, stats, filters, tags, analytics });
}

export default function MyWorkflowsPage() {
  const { workflows, stats, filters, tags, analytics } =
    useLoaderData<typeof loader>();
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
              analytics={analytics}
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
