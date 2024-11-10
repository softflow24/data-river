import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "~/utils/supabase.server";
import { WorkflowList } from "../components/workflows/workflow-list";
import { WorkflowFilters } from "../components/workflows/workflow-filters";

const MOCK_WORKFLOWS = [
  {
    id: "1",
    name: "Email Notification Flow",
    description: "Sends email notifications when new data arrives",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    remix_count: 12,
    total_runs: 156,
    workflow_interests: [
      { interest_id: "automation" },
      { interest_id: "notifications" },
    ],
  },
  {
    id: "2",
    name: "Data Transformation Pipeline",
    description: "Transforms CSV data into JSON format with validation",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    remix_count: 8,
    total_runs: 89,
    workflow_interests: [
      { interest_id: "data-processing" },
      { interest_id: "automation" },
    ],
  },
  {
    id: "3",
    name: "API Integration Workflow",
    description: "Integrates multiple APIs and processes responses",
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    remix_count: 25,
    total_runs: 342,
    workflow_interests: [
      { interest_id: "api" },
      { interest_id: "integration" },
    ],
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const isMock = url.searchParams.get("mock") === "true";

  if (isMock) {
    return json({ workflows: MOCK_WORKFLOWS });
  }

  const { supabase } = await createClient(request);

  const { data: workflows } = await supabase
    .from("workflows")
    .select("*, workflow_interests(interest_id)")
    .order("updated_at", { ascending: false });

  return json({ workflows });
}

export default function MyWorkflowsPage() {
  const { workflows } = useLoaderData<typeof loader>();

  return (
    <div className="container py-8 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Workflows</h1>
        <WorkflowFilters />
      </div>
      <WorkflowList workflows={workflows} />
    </div>
  );
}
