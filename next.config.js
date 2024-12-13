/** @type {import('next').NextConfig} */
const path = require('path');

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
  },
  webpack: (config, { dev, isServer }) => {
    // Suppress punycode warning
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];

    if (!dev) {
      // Disable cache in production
      config.cache = false;
    } else {
      // Configure cache for development
      config.cache = {
        type: 'filesystem',
        allowCollectingMemory: true,
        memoryCacheUnaffected: true,
        buildDependencies: {
          config: [__filename],
        },
      };
    }

    return config;
  }
}

module.exports = nextConfig;