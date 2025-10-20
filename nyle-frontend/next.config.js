/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  // Disable static generation to prevent prerendering errors
  output: 'standalone',
  trailingSlash: false,
  // Force all pages to be dynamic
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
