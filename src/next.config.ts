import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow processing of image files from content directory
  images: {
    domains: [],
    remotePatterns: [],
    // Allow images from content directory to be used
    unoptimized: true,
  },
  // Allow importing markdown files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  // Configure static file serving for content directory
  async rewrites() {
    return [
      {
        source: '/content/:path*',
        destination: '/:path*', // Rewrite to the default public directory
      },
    ];
  },
  // Output standalone build for better file system access
  output: 'standalone',
};

export default nextConfig;
