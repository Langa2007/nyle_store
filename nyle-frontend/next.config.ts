import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  outputFileTracingRoot: path.join(__dirname, "./nyle-frontend"),
};

export default nextConfig;
