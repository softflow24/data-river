begin;  -- Start transaction

-- Create legal_acceptances table
create table if not exists public.legal_acceptances (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  document_type text not null,
  document_version text not null,
  accepted_at timestamptz default now() not null,
  ip_address text,
  user_agent text,
  
  -- Add constraint to ensure document_type is one of our valid types
  constraint valid_document_type check (
    document_type in ('terms_of_service', 'privacy_policy')
  ),
  
  -- Ensure we only have one acceptance per user per document type
  constraint unique_user_document unique (user_id, document_type)
);

-- Add comment to table
comment on table public.legal_acceptances is 'Records of users accepting legal documents';

-- Create indexes
create index legal_acceptances_user_id_idx on public.legal_acceptances(user_id);
create index legal_acceptances_document_type_idx on public.legal_acceptances(document_type);

-- Enable RLS
alter table public.legal_acceptances enable row level security;

-- RLS Policies
create policy "Users can view their own legal acceptances"
  on public.legal_acceptances
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own legal acceptances"
  on public.legal_acceptances
  for insert
  with check (
    auth.uid() = user_id
    and document_version is not null
    and document_type is not null
  );

-- Grant permissions
grant usage on schema public to authenticated;
grant all on public.legal_acceptances to authenticated;

-- Add trigger to prevent updates/deletes
create or replace function prevent_legal_acceptance_modifications()
returns trigger as $$
begin
  raise exception 'Legal acceptances cannot be modified or deleted';
end;
$$ language plpgsql;

create trigger no_update_legal_acceptances
  before update or delete on public.legal_acceptances
  for each row
  execute function prevent_legal_acceptance_modifications();

commit;  -- End transaction 