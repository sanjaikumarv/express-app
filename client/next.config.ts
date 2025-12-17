import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        // Proxy to Backend
        source: "/api/:path*",
        destination: process.env.API_URL + "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
