import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { Plus, Workflow, TrendingUp } from "lucide-react";
import { Card } from "@data-river/shared/ui/components/ui/card";
import { createClient } from "~/utils/supabase.server";
import type { Database } from "~/types/supabase";
import { WorkflowCard } from "../components/workflows/workflow-card";

type WorkflowWithInterests =
  Database["public"]["Tables"]["workflows"]["Row"] & {
    workflow_interests: {
      interest_id: string;
    }[];
    workflow_total_runs: {
      total_runs: number;
    }[];
  };

const MOCK_RECENT: WorkflowWithInterests[] = [
  {
    id: "1",
    name: "Email Notification Flow",
    description: "Sends email notifications when new data arrives",
    flow_state: {},
    is_public: true,
    remix_count: 12,
    created_by: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    remixed_from_id: null,
    workflow_interests: [{ interest_id: "automation" }],
    workflow_total_runs: [{ total_runs: 156 }],
  },
  {
    id: "2",
    name: "Data Transformation Pipeline",
    description: "Transforms CSV data into JSON format",
    flow_state: {},
    is_public: true,
    remix_count: 8,
    created_by: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    remixed_from_id: null,
    workflow_interests: [{ interest_id: "data-processing" }],
    workflow_total_runs: [{ total_runs: 89 }],
  },
  {
    id: "3",
    name: "API Integration Workflow",
    description: "Integrates multiple APIs",
    flow_state: {},
    is_public: true,
    remix_count: 25,
    created_by: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
    remixed_from_id: null,
    workflow_interests: [{ interest_id: "api" }],
    workflow_total_runs: [{ total_runs: 342 }],
  },
];

type FavoriteWorkflowItem = {
  workflow_id: string;
  workflows: WorkflowWithInterests & {
    workflow_total_runs: {
      total_runs: number;
    }[];
  };
};

const MOCK_FAVORITES: FavoriteWorkflowItem[] = [
  {
    workflow_id: "4",
    workflows: {
      id: "4",
      name: "OpenAI Chat Bot",
      description: "AI-powered chat bot",
      flow_state: {},
      is_public: true,
      remix_count: 156,
      created_by: "user-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      remixed_from_id: null,
      workflow_interests: [{ interest_id: "ai" }],
      workflow_total_runs: [{ total_runs: 2451 }],
    },
  },
  {
    workflow_id: "5",
    workflows: {
      id: "5",
      name: "Social Media Scheduler",
      description: "Schedule social media posts",
      flow_state: {},
      is_public: true,
      remix_count: 89,
      created_by: "user-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      remixed_from_id: null,
      workflow_interests: [{ interest_id: "automation" }],
      workflow_total_runs: [{ total_runs: 1205 }],
    },
  },
  {
    workflow_id: "6",
    workflows: {
      id: "6",
      name: "Data Backup Flow",
      description: "Automated backup system",
      flow_state: {},
      is_public: true,
      remix_count: 45,
      created_by: "user-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      remixed_from_id: null,
      workflow_interests: [{ interest_id: "backup" }],
      workflow_total_runs: [{ total_runs: 892 }],
    },
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const isMock = url.searchParams.get("mock") === "true";

  if (isMock) {
    return json({
      recentWorkflows: MOCK_RECENT,
      favoriteWorkflows: MOCK_FAVORITES,
    });
  }

  const { supabase } = await createClient(request);

  const { data: recentWorkflows } = await supabase
    .from("workflows")
    .select(
      `
      *,
      workflow_interests(interest_id),
      workflow_total_runs(total_runs)
    `,
    )
    .order("updated_at", { ascending: false })
    .limit(3);

  const { data: favoriteWorkflows } = await supabase
    .from("workflow_list_items")
    .select(
      `
      workflow_id,
      workflows (
        *,
        workflow_interests(interest_id),
        workflow_total_runs(total_runs)
      )
    `,
    )
    .eq("list_id", "favorites")
    .limit(3);

  return json({ recentWorkflows, favoriteWorkflows });
}

export default function DashboardPage() {
  const { recentWorkflows, favoriteWorkflows } = useLoaderData<typeof loader>();

  return (
    <div className="container py-8 mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Create, manage, and discover automated workflows
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/editor">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Create Workflow</h3>
                <p className="text-sm text-muted-foreground">
                  Start building a new workflow
                </p>
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/workflows">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Workflow className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">My Workflows</h3>
                <p className="text-sm text-muted-foreground">
                  View and manage your workflows
                </p>
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/explore">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Explore</h3>
                <p className="text-sm text-muted-foreground">
                  Discover public workflows
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Activity & Favorites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <Card className="divide-y">
            {recentWorkflows?.map((workflow) => (
              <Link key={workflow.id} to={`/editor/${workflow.id}`}>
                <WorkflowCard
                  workflow={{
                    ...workflow,
                    total_runs:
                      workflow.workflow_total_runs[0]?.total_runs ?? 0,
                  }}
                  variant="compact"
                />
              </Link>
            ))}
          </Card>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
          <Card className="divide-y">
            {favoriteWorkflows
              ?.filter((item) => item.workflows)
              .map((item) => (
                <Link
                  key={item.workflow_id}
                  to={`/editor/${item.workflows!.id}`}
                >
                  <WorkflowCard
                    workflow={{
                      ...item.workflows!,
                      total_runs:
                        item.workflows!.workflow_total_runs[0]?.total_runs ?? 0,
                    }}
                    variant="compact"
                  />
                </Link>
              ))}
          </Card>
        </section>
      </div>
    </div>
  );
}
