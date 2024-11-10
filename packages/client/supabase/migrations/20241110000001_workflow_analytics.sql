begin;

-- Create enum for run status
create type workflow_run_status as enum ('success', 'failure');

-- Create workflow runs table for basic analytics
create table workflow_runs (
  id uuid default gen_random_uuid() primary key,
  workflow_id uuid references workflows(id) on delete cascade,
  status workflow_run_status not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz not null,
  duration_ms int not null -- Duration in milliseconds
);

-- Create function to record workflow run
create or replace function record_workflow_run(
  p_workflow_id uuid,
  p_status workflow_run_status,
  p_started_at timestamptz,
  p_completed_at timestamptz
) returns uuid as $$
declare
  v_run_id uuid;
begin
  insert into workflow_runs (
    workflow_id,
    status,
    started_at,
    completed_at,
    duration_ms
  ) values (
    p_workflow_id,
    p_status,
    p_started_at,
    p_completed_at,
    extract(epoch from (p_completed_at - p_started_at)) * 1000
  ) returning id into v_run_id;

  -- Also increment the daily counter
  perform increment_run_count(p_workflow_id);
  
  return v_run_id;
end;
$$ language plpgsql security definer;

-- Create hourly analytics view
create materialized view workflow_hourly_stats as
select
  workflow_id,
  date_trunc('hour', started_at) as hour,
  count(*) as total_runs,
  count(*) filter (where status = 'success') as successful_runs,
  count(*) filter (where status = 'failure') as failed_runs,
  avg(duration_ms)::integer as avg_duration_ms
from workflow_runs
where started_at > now() - interval '24 hours'
group by workflow_id, date_trunc('hour', started_at);

-- Create function to refresh hourly stats
create or replace function refresh_workflow_hourly_stats()
returns void as $$
begin
  refresh materialized view workflow_hourly_stats;
end;
$$ language plpgsql;

-- Add RLS policies
alter table workflow_runs enable row level security;

-- Allow insert access for recording runs
create policy "Anyone can record workflow runs"
  on workflow_runs for insert
  with check (true);

-- Only workflow owners can view run data
create policy "Workflow owners can view run details"
  on workflow_runs for select
  using (exists (
    select 1 from workflows
    where workflows.id = workflow_runs.workflow_id
    and workflows.created_by = auth.uid()
  ));

-- Create indexes
create index workflow_runs_workflow_id_started_at_idx 
  on workflow_runs(workflow_id, started_at);
create index workflow_runs_status_idx on workflow_runs(status);

-- Create index on hourly stats view
create index workflow_hourly_stats_workflow_hour_idx 
  on workflow_hourly_stats(workflow_id, hour desc);

commit; 