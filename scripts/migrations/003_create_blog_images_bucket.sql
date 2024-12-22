-- Create a new storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true);

-- Set up storage policy to allow authenticated users to upload images
create policy "Allow authenticated users to upload images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'blog-images'
  and (storage.foldername(name))[1] = 'blog-images'
);

-- Set up storage policy to allow public access to images
create policy "Allow public access to blog images"
on storage.objects for select
to public
using (bucket_id = 'blog-images');

-- Set up storage policy to allow authenticated users to delete their own images
create policy "Allow authenticated users to delete their own images"
on storage.objects for delete
to authenticated
using (bucket_id = 'blog-images'); 