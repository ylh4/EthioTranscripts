-- Drop category-related tables and their dependencies
drop table if exists blog_posts_categories cascade;
drop table if exists blog_categories cascade;

-- Remove category-related indexes
drop index if exists blog_categories_slug_idx;
drop index if exists blog_posts_categories_post_id_idx;
drop index if exists blog_posts_categories_category_id_idx; 