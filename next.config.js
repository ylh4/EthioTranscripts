/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['qjcztezbufyqbipwjwjv.supabase.co'],
  },
  // Enable static exports for Netlify
  trailingSlash: true,
  // Disable React StrictMode for production
  reactStrictMode: false,
}

module.exports = nextConfig;