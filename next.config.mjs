/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ionic/react', '@ionic/core', 'ionicons', '@stencil/core', 'axios']
};

export default nextConfig;
