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
  // Handle ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig;