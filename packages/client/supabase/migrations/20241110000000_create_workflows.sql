begin;  -- Start transaction

-- Create workflows table with additional counters
create table workflows (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  flow_state jsonb not null default '{}'::jsonb,
  is_public boolean default false,
  remix_count int default 0,
  created_by uuid references auth.users(id) not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  remixed_from_id uuid references workflows(id)
);

-- Create a separate counter table for high-frequency updates
create table workflow_run_counts (
  workflow_id uuid references workflows(id) on delete cascade,
  date date not null,
  count int default 0,
  primary key (workflow_id, date)
);

-- Function to increment run count efficiently
create or replace function increment_run_count(workflow_id uuid)
returns void as $$
begin
  insert into workflow_run_counts (workflow_id, date, count)
  values (workflow_id, current_date, 1)
  on conflict (workflow_id, date)
  do update set count = workflow_run_counts.count + 1;
end;
$$ language plpgsql;

-- Create materialized view for total runs (refresh periodically)
create materialized view workflow_total_runs as
select 
  workflow_id,
  sum(count) as total_runs
from workflow_run_counts
group by workflow_id;

-- Function to refresh the materialized view
create or replace function refresh_workflow_total_runs()
returns void as $$
begin
  refresh materialized view workflow_total_runs;
end;
$$ language plpgsql;

-- Create workflow_interests junction table
create table workflow_interests (
  workflow_id uuid references workflows(id) on delete cascade,
  interest_id uuid references interests(id) on delete cascade,
  primary key (workflow_id, interest_id)
);

-- Create workflow lists (collections) table
create table workflow_lists (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  created_by uuid references auth.users(id) not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Create workflow_list_items table
create table workflow_list_items (
  list_id uuid references workflow_lists(id) on delete cascade,
  workflow_id uuid references workflows(id) on delete cascade,
  added_at timestamptz default now() not null,
  primary key (list_id, workflow_id)
);

-- Create function to increment counters atomically
create or replace function increment_workflow_counter(
  workflow_id uuid,
  counter_name text
) returns void as $$
begin
  execute format('
    update workflows 
    set %I = %I + 1 
    where id = $1
  ', counter_name, counter_name)
  using workflow_id;
end;
$$ language plpgsql;

-- Create view for user public workflow counts
create view user_workflow_stats as
select 
  created_by as user_id,
  count(*) filter (where is_public) as public_workflow_count,
  count(*) as total_workflow_count
from workflows
group by created_by;

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add trigger to workflows table
create trigger update_workflows_updated_at
  before update on workflows
  for each row
  execute function update_updated_at_column();

create trigger update_workflow_lists_updated_at
  before update on workflow_lists
  for each row
  execute function update_updated_at_column();

-- Add RLS policies
alter table workflows enable row level security;
alter table workflow_interests enable row level security;
alter table workflow_lists enable row level security;
alter table workflow_list_items enable row level security;

-- Workflows policies
create policy "Users can view their own workflows"
  on workflows for select
  using (auth.uid() = created_by);

create policy "Users can view public workflows"
  on workflows for select
  using (is_public = true);

create policy "Users can insert their own workflows"
  on workflows for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own workflows"
  on workflows for update
  using (auth.uid() = created_by);

create policy "Users can delete their own workflows"
  on workflows for delete
  using (auth.uid() = created_by);

-- Workflow lists policies
create policy "Users can view their own lists"
  on workflow_lists for select
  using (auth.uid() = created_by);

create policy "Users can create their own lists"
  on workflow_lists for insert
  with check (auth.uid() = created_by);

create policy "Users can manage their own lists"
  on workflow_lists for update using (auth.uid() = created_by);

create policy "Users can delete their own lists"
  on workflow_lists for delete using (auth.uid() = created_by);

-- Workflow list items policies
create policy "Users can view items in their lists"
  on workflow_list_items for select
  using (exists (
    select 1 from workflow_lists
    where workflow_lists.id = workflow_list_items.list_id
    and workflow_lists.created_by = auth.uid()
  ));

create policy "Users can manage items in their lists"
  on workflow_list_items for all
  using (exists (
    select 1 from workflow_lists
    where workflow_lists.id = workflow_list_items.list_id
    and workflow_lists.created_by = auth.uid()
  ));

-- Create indexes
create index workflows_created_by_idx on workflows(created_by);
create index workflows_popularity_idx on workflows(remix_count) 
  where is_public = true;
create index workflows_interests_workflow_idx on workflow_interests(workflow_id);
create index workflows_interests_interest_idx on workflow_interests(interest_id);
create index workflow_lists_created_by_idx on workflow_lists(created_by);
create index workflow_list_items_workflow_idx on workflow_list_items(workflow_id);

-- Create index on the materialized view
create index workflow_total_runs_idx on workflow_total_runs(total_runs desc);

commit;  -- End transaction