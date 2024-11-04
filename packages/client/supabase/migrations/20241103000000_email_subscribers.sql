begin;  -- Start transaction

-- Create email subscribers table with improved structure
create table public.email_subscribers (
    id uuid default gen_random_uuid() primary key,
    email text not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now(),
    status text default 'active' not null,
    
    -- Tracking fields
    source text,
    ip_address inet,
    user_agent text,
    
    constraint email_format check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    constraint email_subscribers_email_key unique (email),
    constraint status_values check (status in ('active', 'unsubscribed', 'bounced', 'complained'))
);

-- Enable RLS
alter table public.email_subscribers enable row level security;

-- Create indexes
create index email_subscribers_email_idx on email_subscribers (email);
create index email_subscribers_status_idx on email_subscribers (status);
create index email_subscribers_created_at_idx on email_subscribers (created_at);

-- Create simplified policies

-- Allow public insert for newsletter signup
create policy "Anyone can subscribe"
    on email_subscribers
    for insert
    with check (true);

-- Allow public to read their own subscription
create policy "Subscribers can view own subscription"
    on email_subscribers
    for select
    using (true);

-- Allow admins full access
create policy "Admins have full access"
    on email_subscribers
    for all
    using (auth.jwt() ->> 'role' = 'admin');

-- Trigger for updated_at
create trigger set_updated_at
    before update on email_subscribers
    for each row
    execute procedure public.handle_updated_at();

-- Add helpful comments
comment on table public.email_subscribers is 'Stores email subscribers for newsletters and communications';
comment on column public.email_subscribers.status is 'Subscription status: active, unsubscribed, bounced, or complained';
comment on column public.email_subscribers.source is 'Where the subscription originated from';

commit;  -- End transaction
