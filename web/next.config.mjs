/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/rss/:path*/",
        destination: "https://knvd.krcert.or.kr/rss/securityInfo.do:path*/",
      },
    ];
  },
  trailingSlash: true,
};

export default nextConfig;
