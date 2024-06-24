import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        //pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        //pathname: "/account123/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
