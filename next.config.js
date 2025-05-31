/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to enable NextAuth API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;