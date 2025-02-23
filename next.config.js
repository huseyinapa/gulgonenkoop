/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "backend.gulgonenkoop.com",
        pathname: "/api_gulgonen/images/**",
      },
      {
        protocol: "https",
        hostname: "backend.gulgonenkoop.com",
        pathname: "/api_gulgonen/images/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
