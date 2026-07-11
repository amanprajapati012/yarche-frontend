/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    " 192.168.29.172"
  ],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: " 192.168.29.172",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;