/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  // Ensure we're outputting for the web
  output: 'standalone',
  // Explicitly set the target
  target: 'server'
}

module.exports = nextConfig