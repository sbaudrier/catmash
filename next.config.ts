import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*.media.tumblr.com",
      },
      {
        protocol: "https",
        hostname: "*.media.tumblr.com",
      },
    ],
  },
};

export default nextConfig;
