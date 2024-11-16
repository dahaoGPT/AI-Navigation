/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
      appDir: true,
    },
  distDir: 'build',
  port: 80, // port: 3000,
};

module.exports = nextConfig;