begin;  -- Start transaction

-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now(),
  username text unique,
  display_name text,
  avatar_url text,
  website text,
  
  -- Location fields
  country text,
  city text,
  timezone text,
  
  -- Professional info
  company text,
  job_title text,
  bio text,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
-- Allow public read access
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- Allow authenticated users to update their own profile
create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Add a function to check if username is set
create function public.has_username(user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where id = user_id and username is not null
  );
end;
$$ language plpgsql security definer;

-- Modify handle_new_user to create initial profile
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'User_' || substr(new.id::text, 1, 8)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create indexes for better performance
create index profiles_username_idx on profiles (username);
create index profiles_created_at_idx on profiles (created_at);
create index profiles_updated_at_idx on profiles (updated_at);
create index profiles_country_idx on profiles (country);
create index profiles_city_idx on profiles (city);

-- Function to automatically update updated_at timestamp
create function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically update updated_at timestamp
create trigger on_profile_updated
  before update on profiles
  for each row execute procedure public.handle_updated_at();

commit;  -- End transaction
