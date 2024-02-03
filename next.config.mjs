import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fastly.picsum.photos",
      },
    ],
  },
};

export default nextConfig;
