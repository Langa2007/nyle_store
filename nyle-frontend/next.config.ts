import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: {}, // enable turbopack safely
  },
};

export default nextConfig;
