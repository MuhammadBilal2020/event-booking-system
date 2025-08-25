// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  experimental: {
    nodeMiddleware: true, // ⚡️ yaha enable karna hai
  },
};



export default nextConfig;
