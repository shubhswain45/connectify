import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['toppng.com', 'www.freepnglogos.com'], // Add the external domain here
  },
};

export default nextConfig;
