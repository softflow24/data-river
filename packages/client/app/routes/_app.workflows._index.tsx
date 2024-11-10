import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { createClient } from "~/utils/supabase.server";
import { WorkflowList } from "../components/workflows/workflow-list";
import { WorkflowFilters } from "../components/workflows/workflow-filters";
import {
  GitFork,
  Globe,
  Play,
  Plus,
  Workflow as WorkflowIcon,
} from "lucide-react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Link } from "@remix-run/react";
import {
  parseSearchParams,
  stringifyFilters,
  type WorkflowFilters,
} from "~/schemas/workflow-filters";
import { useCallback } from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
};

function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}

const MOCK_WORKFLOWS = [
  {
    id: "1",
    name: "Email Notification Flow",
    description: "Sends email notifications when new data arrives",
    flow_state: {},
    is_public: true,
    remix_count: 12,
    created_by: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    remixed_from_id: null,
    workflow_interests: [{ interest_id: "automation" }],
    workflow_total_runs: [{ total_runs: 156 }],
  },
];

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
    });
  }

  const { supabase } = await createClient(request);

  // First get workflow IDs that match the tag filter
  let workflowIds: string[] | null = null;
  if (filters.tags.length > 0) {
    const { data: taggedWorkflows } = await supabase
      .from("workflow_interests")
      .select("workflow_id")
      .in("interest_id", filters.tags)
      .then((res) => res.data?.map((w) => w.workflow_id) ?? []);

    workflowIds = taggedWorkflows;
  }

  // Then build the main query
  let query = supabase.from("workflows").select(`
      *,
      workflow_interests(interest_id),
      workflow_total_runs(total_runs)
    `);

  // Apply filters
  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  if (filters.public) {
    query = query.eq("is_public", true);
  }

  if (workflowIds !== null) {
    query = query.in("id", workflowIds);
  }

  if (filters.dateFrom) {
    query = query.gte("created_at", filters.dateFrom);
  }

  if (filters.dateTo) {
    query = query.lte("created_at", filters.dateTo);
  }

  // Apply sorting
  switch (filters.sort) {
    case "created":
      query = query.order("created_at", { ascending: false });
      break;
    case "name":
      query = query.order("name");
      break;
    case "runs":
      // We'll need to sort after fetching since this is in a view
      break;
    case "remixes":
      query = query.order("remix_count", { ascending: false });
      break;
    default:
      query = query.order("updated_at", { ascending: false });
  }

  const { data: workflows } = await query;

  // Post-process for run count sorting if needed
  let processedWorkflows = workflows || [];
  if (filters.sort === "runs" && processedWorkflows.length > 0) {
    processedWorkflows.sort((a, b) => {
      const aRuns = a.workflow_total_runs?.[0]?.total_runs ?? 0;
      const bRuns = b.workflow_total_runs?.[0]?.total_runs ?? 0;
      return bRuns - aRuns;
    });
  }

  const stats = {
    totalWorkflows: processedWorkflows.length,
    publicWorkflows: processedWorkflows.filter((w) => w.is_public).length,
    totalRuns: processedWorkflows.reduce(
      (acc, w) => acc + (w.workflow_total_runs?.[0]?.total_runs ?? 0),
      0,
    ),
    totalRemixes: processedWorkflows.reduce(
      (acc, w) => acc + (w.remix_count ?? 0),
      0,
    ),
  };

  return json({ workflows: processedWorkflows, stats, filters });
}

export default function MyWorkflowsPage() {
  const { workflows, stats, filters } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFiltersChange = useCallback(
    (newFilters: Partial<WorkflowFilters>) => {
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

          <div className="grid grid-cols-4 gap-4 mt-4">
            <StatsCard
              title="Total Workflows"
              value={stats.totalWorkflows}
              icon={<WorkflowIcon className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Public Workflows"
              value={stats.publicWorkflows}
              icon={<Globe className="h-4 w-4 text-muted-foreground" />}
              description={`${stats.totalWorkflows - stats.publicWorkflows} private workflows`}
            />
            <StatsCard
              title="Total Runs"
              value={stats.totalRuns}
              icon={<Play className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Total Remixes"
              value={stats.totalRemixes}
              icon={<GitFork className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
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
