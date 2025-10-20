/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  // Disable static generation completely
  trailingSlash: false,
  // Force all pages to be dynamic
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Disable static optimization
  generateStaticParams: false,
  // Force dynamic rendering
  dynamicParams: true,
  // Disable static generation for all routes
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Force all pages to be dynamic
  async rewrites() {
    return []
  },
};

module.exports = nextConfig;
