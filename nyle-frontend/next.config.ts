import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizeCss: true,
  },
  // Disable pages router fallback to prevent Html import errors
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
