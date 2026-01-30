import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/users/test-rendering/static",
        headers: [{ key: "refresh", value: "5" }],
      },
      {
        source: "/users/test-rendering/dynamic",
        headers: [{ key: "refresh", value: "1" }],
      },
      {
        source: "/users/test-rendering/isr",
        headers: [{ key: "refresh", value: "5" }],
      },
    ];
  },
};

export default nextConfig;
