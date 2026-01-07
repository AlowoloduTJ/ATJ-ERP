import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Exclude prisma folder from compilation (project uses Supabase)
  typescript: {
    // Ignore build errors from prisma folder
    ignoreBuildErrors: false,
  },
  // Exclude prisma from page compilation
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Webpack config to ignore prisma folder
  webpack: (config, { isServer }) => {
    // Ignore prisma folder in webpack
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules/**', '**/prisma/**', '**/.git/**'],
    };
    return config;
  },
};

export default nextConfig;
