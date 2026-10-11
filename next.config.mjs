/** Static frontend for Cloudflare Pages; backend endpoints live in /functions. */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {unoptimized:true},
};
export default nextConfig;
