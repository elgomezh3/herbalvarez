/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // El panel de Sveltia CMS vive en public/admin/index.html.
      // Esto hace que /admin (sin barra) también lo sirva, en dev y en producción.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
