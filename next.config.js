/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/public/img/**',
      },
    ],
  },
}

module.exports = nextConfig
