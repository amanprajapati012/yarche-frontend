/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "192.168.29.170"
  ],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.29.170",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;