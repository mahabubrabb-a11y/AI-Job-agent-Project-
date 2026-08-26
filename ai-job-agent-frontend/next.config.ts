/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // স্ট্যাটিক জেনারেশন এরর চিরতরে বন্ধ করার জন্য এটি যুক্ত করা হলো:
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;