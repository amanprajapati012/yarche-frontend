/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    " 192.168.29.171"
  ],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: " 192.168.29.171",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;