const isCloudflare = process.env.CF_PAGES === '1' || process.env.BUILD_TARGET === 'cloudflare';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isCloudflare
    ? {
        output: 'export',
        images: {
          unoptimized: true,
        },
      }
    : {}),
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./data/**/*'],
    },
  },
};

export default nextConfig;
