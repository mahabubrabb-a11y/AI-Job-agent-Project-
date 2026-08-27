import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // যদি কোনো output এক্সপোর্ট কনফিগারেশন থাকে তা বাদ দেওয়া হলো যাতে সার্ভার মোডে চলে
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;