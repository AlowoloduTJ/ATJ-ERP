import type { NextConfig } from "next";
import webpack from "webpack";

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
    // Completely ignore prisma files from compilation
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/prisma\/.*$/,
        contextRegExp: /.*/,
      })
    );
    // Also ignore any imports of prisma files
    config.plugins.push(
      new webpack.IgnorePlugin({
        checkResource(resource: string) {
          return resource.includes('/prisma/') && 
                 (resource.endsWith('.ts') || resource.endsWith('.js') || resource.endsWith('.tsx') || resource.endsWith('.jsx'));
        },
      })
    );
    return config;
  },
};

export default nextConfig;
