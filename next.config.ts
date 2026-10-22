import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Local font files are self-hosted via @fontsource packages — no external
  // font requests are made at build time or runtime.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
