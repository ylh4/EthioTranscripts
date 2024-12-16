-- Insert predefined blog categories
INSERT INTO blog_categories (name, slug, description, created_at, updated_at)
VALUES
  (
    'News',
    'news',
    'Latest news and updates about transcripts and educational services',
    NOW(),
    NOW()
  ),
  (
    'Scholarships',
    'scholarships',
    'Information about scholarship opportunities and application processes',
    NOW(),
    NOW()
  ),
  (
    'Resources',
    'resources',
    'Helpful resources and guides for students and institutions',
    NOW(),
    NOW()
  ),
  (
    'Other',
    'other',
    'Other relevant information and announcements',
    NOW(),
    NOW()
  )
ON CONFLICT (slug) DO NOTHING; 