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
  async headers() {
    return [
      {
        source: '/:section(admin|sign-in|sign-up|demo)/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

export default nextConfig;
