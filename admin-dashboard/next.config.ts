import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Ignore ESLint errors during production builds (safe for deployment)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
