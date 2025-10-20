/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static generation completely
  trailingSlash: false,
  // Force all pages to be dynamic
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Disable static generation for all routes
  generateStaticParams: false,
  // Force dynamic rendering
  dynamicParams: true,
};

module.exports = nextConfig;
