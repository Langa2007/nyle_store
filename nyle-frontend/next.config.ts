import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Only enable Turbopack in development — not on Render
  ...(isProd
    ? {}
    : {
        turbopack: {
          root: "./src",
        },
      }),

  // ✅ This fixes the Render “multiple lockfiles” and tracing issues
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
