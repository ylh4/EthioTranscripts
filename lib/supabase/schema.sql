-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Create admin_users table
create table admin_users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create university_locations table
create table university_locations (
  id uuid default uuid_generate_v4() primary key,
  country text not null,
  city text not null,
  address text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create document_requests table
create table document_requests (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  reference_number text not null unique,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'rejected')),
  
  -- Personal Information
  full_name text not null,
  email text not null,
  phone text not null,
  
  -- Document Information
  from_university text not null,
  to_university text not null,
  to_university_location_id uuid references university_locations(id),
  document_type text not null,
  
  -- Additional Services
  needs_translation boolean default false,
  needs_apostille boolean default false,
  additional_remarks text
);

-- Enable RLS
alter table admin_users enable row level security;
alter table document_requests enable row level security;
alter table university_locations enable row level security;

-- Create RLS policies for document_requests
create policy "Enable read access for all users" on document_requests
  for select using (true);

create policy "Enable insert access for all users" on document_requests
  for insert with check (true);

create policy "Enable updates for admins" on document_requests
  for update using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from admin_users
      where email = auth.jwt()->>'email'
    )
  );

create policy "Enable delete for admins" on document_requests
  for delete using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from admin_users
      where email = auth.jwt()->>'email'
    )
  );

-- Create RLS policies for admin_users
create policy "Enable read access for admins" on admin_users
  for select using (auth.role() = 'authenticated');

create policy "Enable insert for service role" on admin_users
  for insert with check (auth.jwt()->>'role' = 'service_role');

create policy "Enable update for service role" on admin_users
  for update using (auth.jwt()->>'role' = 'service_role');

create policy "Enable delete for service role" on admin_users
  for delete using (auth.jwt()->>'role' = 'service_role');

-- Create RLS policies for university_locations
create policy "Enable read access for locations" on university_locations
  for select using (true);

create policy "Enable insert for all users" on university_locations
  for insert with check (true);

create policy "Enable update for admins" on university_locations
  for update using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from admin_users
      where email = auth.jwt()->>'email'
    )
  );

create policy "Enable delete for admins" on university_locations
  for delete using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from admin_users
      where email = auth.jwt()->>'email'
    )
  );

-- Create functions
create or replace function check_admin_status(email_input text)
returns boolean as $$
begin
  return exists (
    select 1 from admin_users
    where email = email_input
  );
end;
$$ language plpgsql security definer;

-- Create triggers
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_document_requests_updated_at
  before update on document_requests
  for each row
  execute function update_updated_at();

create trigger update_admin_users_updated_at
  before update on admin_users
  for each row
  execute function update_updated_at();

-- Create contact_messages table
create table contact_messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'replied', 'archived'))
);

-- Enable RLS for contact_messages
alter table contact_messages enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Enable insert access for all users" on contact_messages;
drop policy if exists "Enable read access for admins" on contact_messages;
drop policy if exists "Enable update for admins" on contact_messages;
drop policy if exists "Enable delete for admins" on contact_messages;

-- Create RLS policies for contact_messages
create policy "Allow public insert" on contact_messages
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow admin read" on contact_messages
  for select
  to authenticated
  using (
    exists (
      select 1 from admin_users
      where email = auth.jwt()->>'email'
    )
  );

create policy "Allow admin update" on contact_messages
  for update
  to authenticated
  using (
    exists (
      select 1 from admin_users
      where email = auth.jwt()->>'email'
    )
  );

create policy "Allow admin delete" on contact_messages
  for delete
  to authenticated
  using (
    exists (
      select 1 from admin_users
      where email = auth.jwt()->>'email'
    )
  );

-- Add updated_at trigger for contact_messages
create trigger update_contact_messages_updated_at
  before update on contact_messages
  for each row
  execute function update_updated_at();