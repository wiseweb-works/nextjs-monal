import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hosted.weblate.org',
      },
    ],

    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 128, 256, 512],
    loader: 'default',
  },

  reactStrictMode: true,
};

export default nextConfig;
