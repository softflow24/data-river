import { SupabaseClient } from "@supabase/supabase-js";
import type { WorkflowFilters } from "~/schemas/workflow-filters";
import type { Database } from "~/types/supabase";

export async function getFilteredWorkflows(
  supabase: SupabaseClient<Database>,
  filters: WorkflowFilters,
) {
  // First get workflow IDs that match the tag filter
  let workflowIds: string[] | null = null;
  if (filters.tags.length > 0) {
    const taggedWorkflows = await supabase
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

  return processedWorkflows;
}
