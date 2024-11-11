export const MOCK_WORKFLOWS = [
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
