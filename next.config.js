/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['qjcztezbufyqbipwjwjv.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qjcztezbufyqbipwjwjv.supabase.co',
      },
    ],
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  distDir: '.next',
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];
    return config;
  },
  // Next.js 14 optimizations
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-toast',
      'lucide-react'
    ]
  },
  // Static export configuration
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig