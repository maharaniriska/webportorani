import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://apiportomaharani.pythonanywhere.com';
let apiHost = 'apiportomaharani.pythonanywhere.com';
try {
  apiHost = new URL(apiUrl).hostname;
} catch (e) {
  // ignore
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: apiHost,
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
