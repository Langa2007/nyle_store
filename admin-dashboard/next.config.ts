// next.config.ts - MINIMAL FIX
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove the eslint property - that's the error
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  
  // Keep everything else as is
  // ... rest of your config
};

export default nextConfig;