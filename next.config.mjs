/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV
const isDev = env == "development";

const nextConfig = {
  basePath: isDev ? '' : '/c24-website',
  assetPrefix: isDev ? '' : '/c24-website/',
};

export default nextConfig;
