import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

export async function getWorkflowTags(supabase: SupabaseClient<Database>) {
  // First get all interests
  const { data: interests } = await supabase
    .from("interests")
    .select("id, slug, color");

  // Then get the counts for user's workflows
  const { data: userTagCounts } = await supabase
    .from("workflow_interests")
    .select(
      `
      interest_id,
      workflows!inner(id, created_by)
    `,
    )
    .eq("workflows.created_by", supabase.auth.getUser());

  // Count the occurrences
  const tagCounts =
    userTagCounts?.reduce(
      (acc, tag) => {
        const id = tag.interest_id;
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ) ?? {};

  // Map all interests, including those with 0 count
  return (
    interests
      ?.map((interest) => ({
        id: interest.slug,
        color: interest.color,
        count: tagCounts[interest.id] ?? 0,
      }))
      .sort((a, b) => b.count - a.count) ?? []
  ); // Sort by count descending
}
