/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['xxxxx.supabase.co'], // ganti dengan projectmu
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
