import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Retired page from the previous site.
      { source: "/supply-installation", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
