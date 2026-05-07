/** @type {import('next').NextConfig} */
const nextConfig = {
  // API proxy só pra dev local — em prod aponta pro api-stores.persysta.com.br
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_INTERNAL_URL ?? "http://localhost:8001"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
