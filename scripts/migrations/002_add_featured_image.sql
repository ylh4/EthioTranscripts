-- Add featured_image column to blog_posts table
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image text; 