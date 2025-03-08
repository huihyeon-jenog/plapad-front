import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'k.kakaocdn.net',
      },
      {
        hostname: 'phinf.pstatic.net',
      },
      {
        hostname: 'lh3.googleusercontent.com'
      }
    ],
  },
};

export default nextConfig;
