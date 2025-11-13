import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
        ],
        source: '/api/:path*',
      },
    ];
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'yt3.ggpht.com',
      'unify-posts.265909a43f2518fcee395592b006822e.r2.cloudflarestorage.com',
    ],

    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
