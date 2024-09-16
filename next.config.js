/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
      },
    distDir: 'build',
    output: 'standalone'
  }
  
  module.exports = nextConfig