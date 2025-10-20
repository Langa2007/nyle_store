import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {}, // optional placeholder to avoid config errors
    },
  },
  turbopack: {
    root: "./src",
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
