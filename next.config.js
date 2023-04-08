/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  env: {
    API_URL:"https://dev.funnelliner.com/api/v1",
  },
  publicRuntimeConfig: {
    API_URL: "https://dev.funnelliner.com/api/v1",
  },
  output: 'standalone',
}

module.exports = nextConfig
