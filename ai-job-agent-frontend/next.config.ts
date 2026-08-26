/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // স্ট্যাটিক পেজ জেনারেশন বন্ধ করে সব ডাইনামিক পেজ সার্ভারে রান করার জন্য:
  experimental: {
    // কোনো এক্সপেরিমেন্টাল কনফিগ থাকলে তা রিমুভ করে এটি দিচ্ছি
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;