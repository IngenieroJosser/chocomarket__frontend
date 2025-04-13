import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignora errores de ESLint en producción (como variables no usadas)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora errores de TypeScript en producción (como uso de "any")
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
