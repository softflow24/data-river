begin;

-- Create interests table
create table if not exists public.interests (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  icon text not null,
  color text not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Create user_interests join table
create table if not exists public.user_interests (
  user_id uuid references auth.users(id) not null,
  interest_id uuid references public.interests(id) not null,
  created_at timestamptz default now() not null,
  primary key (user_id, interest_id)
);

-- Add RLS policies
alter table public.interests enable row level security;
alter table public.user_interests enable row level security;

-- Everyone can read interests
create policy "Anyone can read interests"
  on public.interests
  for select
  to authenticated
  using (true);

-- Users can manage their own interests
create policy "Users can manage their own interests"
  on public.user_interests
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Insert initial interests data
insert into public.interests (slug, name, icon, color) values
  ('ai', 'AI', 'Brain', 'bg-purple-100 dark:bg-purple-950'),
  ('secops', 'SecOps', 'Shield', 'bg-red-100 dark:bg-red-950'),
  ('sales', 'Sales', 'BadgeDollarSign', 'bg-green-100 dark:bg-green-950'),
  ('it-ops', 'IT Ops', 'Monitor', 'bg-blue-100 dark:bg-blue-950'),
  ('marketing', 'Marketing', 'Megaphone', 'bg-yellow-100 dark:bg-yellow-950'),
  ('engineering', 'Engineering', 'Wrench', 'bg-orange-100 dark:bg-orange-950'),
  ('devops', 'DevOps', 'Container', 'bg-teal-100 dark:bg-teal-950'),
  ('building-blocks', 'Building Blocks', 'Blocks', 'bg-indigo-100 dark:bg-indigo-950'),
  ('design', 'Design', 'Palette', 'bg-pink-100 dark:bg-pink-950'),
  ('finance', 'Finance', 'LineChart', 'bg-emerald-100 dark:bg-emerald-950'),
  ('hr', 'HR', 'Users', 'bg-cyan-100 dark:bg-cyan-950'),
  ('product', 'Product', 'Boxes', 'bg-violet-100 dark:bg-violet-950'),
  ('support', 'Support', 'MessageSquare', 'bg-rose-100 dark:bg-rose-950'),
  ('other', 'Other', 'Code', 'bg-slate-100 dark:bg-slate-950');

-- Add updated_at trigger
create or replace function update_updated_at_column()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger interests_updated_at
  before update on public.interests
  for each row
  execute function update_updated_at_column();

-- Create indexes
create index user_interests_user_id_idx on public.user_interests(user_id);
create index user_interests_interest_id_idx on public.user_interests(interest_id);
create index interests_slug_idx on public.interests(slug);

commit; 