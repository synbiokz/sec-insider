/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add your webpack configurations here
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['undici']
  }
}

module.exports = nextConfig