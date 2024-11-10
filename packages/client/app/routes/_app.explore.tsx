import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "~/utils/supabase.server";
import { WorkflowGrid } from "../components/workflows/workflow-grid";
import { ExploreFilters } from "../components/workflows/explore-filters";

const MOCK_WORKFLOWS = [
  {
    id: "4",
    name: "OpenAI Chat Bot",
    description: "Integrates OpenAI's GPT API for automated chat responses",
    updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    remix_count: 156,
    total_runs: 2451,
    workflow_interests: [{ interest_id: "ai" }, { interest_id: "chatbot" }],
  },
  {
    id: "5",
    name: "Social Media Scheduler",
    description: "Automated social media post scheduling across platforms",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    remix_count: 89,
    total_runs: 1205,
    workflow_interests: [
      { interest_id: "social-media" },
      { interest_id: "automation" },
    ],
  },
  {
    id: "6",
    name: "Data Backup Flow",
    description: "Automated backup system for multiple data sources",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    remix_count: 45,
    total_runs: 892,
    workflow_interests: [{ interest_id: "backup" }, { interest_id: "data" }],
  },
  {
    id: "7",
    name: "Invoice Generator",
    description: "Automatically generates and sends invoices based on triggers",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36 hours ago
    remix_count: 67,
    total_runs: 1567,
    workflow_interests: [
      { interest_id: "finance" },
      { interest_id: "automation" },
    ],
  },
  {
    id: "8",
    name: "Weather Alert System",
    description: "Sends notifications based on weather conditions",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    remix_count: 34,
    total_runs: 678,
    workflow_interests: [
      { interest_id: "weather" },
      { interest_id: "notifications" },
    ],
  },
  {
    id: "9",
    name: "Log Analysis Pipeline",
    description: "Analyzes log files and generates reports",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    remix_count: 23,
    total_runs: 445,
    workflow_interests: [
      { interest_id: "analytics" },
      { interest_id: "monitoring" },
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
    .select(
      `
      *,
      workflow_interests(interest_id),
      workflow_total_runs(total_runs),
      profiles(username, display_name, avatar_url)
    `,
    )
    .eq("is_public", true)
    .order("remix_count", { ascending: false });

  return json({ workflows });
}

export default function ExplorePage() {
  const { workflows } = useLoaderData<typeof loader>();

  return (
    <div className="container py-8 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore Workflows</h1>
          <p className="text-muted-foreground">
            Discover and remix public workflows from the community
          </p>
        </div>
        <ExploreFilters />
      </div>
      <WorkflowGrid workflows={workflows ?? []} />
    </div>
  );
}
