import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ SWC minification is now automatic — no need to define it manually.
  // ✅ You can safely add experimental keys if needed later.
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
