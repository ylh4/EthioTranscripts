-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing tables and dependencies
drop table if exists blog_posts_categories cascade;
drop table if exists blog_comments cascade;
drop table if exists blog_categories cascade;
drop table if exists blog_posts cascade;

-- Create blog_posts table
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text not null,
  featured_image text,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create categories table
create table blog_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create posts_categories junction table
create table blog_posts_categories (
  post_id uuid not null references blog_posts(id) on delete cascade,
  category_id uuid not null references blog_categories(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (post_id, category_id)
);

-- Create comments table
create table blog_comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid not null references blog_posts(id) on delete cascade,
  author_name text not null,
  author_email text not null,
  content text not null,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index blog_posts_slug_idx on blog_posts(slug);
create index blog_posts_published_at_idx on blog_posts(published_at);
create index blog_categories_slug_idx on blog_categories(slug);
create index blog_comments_post_id_idx on blog_comments(post_id);
create index blog_posts_categories_post_id_idx on blog_posts_categories(post_id);
create index blog_posts_categories_category_id_idx on blog_posts_categories(category_id);

-- Enable Row Level Security
alter table blog_posts enable row level security;
alter table blog_categories enable row level security;
alter table blog_posts_categories enable row level security;
alter table blog_comments enable row level security;

-- Create RLS policies for blog_posts
create policy "Public blog posts are viewable by everyone"
  on blog_posts for select
  using (published_at is not null and published_at <= now());

create policy "Blog posts are editable by authenticated users only"
  on blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create RLS policies for blog_categories
create policy "Categories are viewable by everyone"
  on blog_categories for select
  using (true);

create policy "Categories are editable by authenticated users only"
  on blog_categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create RLS policies for blog_posts_categories
create policy "Post categories are viewable by everyone"
  on blog_posts_categories for select
  using (true);

create policy "Post categories are editable by authenticated users only"
  on blog_posts_categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create RLS policies for blog_comments
create policy "Approved comments are viewable by everyone"
  on blog_comments for select
  using (is_approved = true);

create policy "Comments are editable by authenticated users only"
  on blog_comments for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create policy for public comment submission
create policy "Anyone can submit comments"
  on blog_comments for insert
  with check (true); 