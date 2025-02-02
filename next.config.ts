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
    ],
  },
};

export default nextConfig;
