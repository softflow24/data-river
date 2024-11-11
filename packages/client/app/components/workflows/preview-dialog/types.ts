export interface WorkflowData {
  id: string;
  name: string;
  description: string | null;
  updated_at: string;
  remix_count: number | null;
  total_runs?: number;
  workflow_interests: { interest_id: string }[];
}

export interface WorkflowAnalytics {
  hourly_stats: Array<{
    hour: string;
    total_runs: number;
    successful_runs: number;
    failed_runs: number;
    avg_duration_ms: number;
  }>;
}
