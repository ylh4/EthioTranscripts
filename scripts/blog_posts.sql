-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Add published_at column to existing blog_posts table
alter table blog_posts
add column if not exists published_at timestamp with time zone,
alter column created_at set default timezone('utc'::text, now()),
alter column updated_at set default timezone('utc'::text, now());

-- Create index for faster slug lookups if it doesn't exist
create index if not exists blog_posts_slug_idx on blog_posts(slug);

-- Enable Row Level Security
alter table blog_posts enable row level security;

-- Drop existing policies if any
drop policy if exists "Public blog posts are viewable by everyone" on blog_posts;
drop policy if exists "Blog posts are editable by authenticated users only" on blog_posts;

-- Create policies
create policy "Public blog posts are viewable by everyone"
  on blog_posts for select
  using (published_at is not null and published_at <= now());

create policy "Blog posts are editable by authenticated users only"
  on blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create categories table if it doesn't exist
create table if not exists blog_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on categories
alter table blog_categories enable row level security;

-- Create policies for categories
create policy "Categories are viewable by everyone"
  on blog_categories for select
  using (true);

create policy "Categories are editable by authenticated users only"
  on blog_categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create or update blog_posts_categories junction table
create table if not exists blog_posts_categories (
  post_id uuid references blog_posts(id) on delete cascade,
  category_id uuid references blog_categories(id) on delete cascade,
  primary key (post_id, category_id)
);

-- Enable RLS on junction table
alter table blog_posts_categories enable row level security;

-- Create policies for junction table
create policy "Post categories are viewable by everyone"
  on blog_posts_categories for select
  using (true);

create policy "Post categories are editable by authenticated users only"
  on blog_posts_categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create or update blog_comments table
create table if not exists blog_comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references blog_posts(id) on delete cascade,
  author_name text not null,
  author_email text not null,
  content text not null,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on comments
alter table blog_comments enable row level security;

-- Create policies for comments
create policy "Approved comments are viewable by everyone"
  on blog_comments for select
  using (is_approved = true);

create policy "Comments are editable by authenticated users only"
  on blog_comments for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');