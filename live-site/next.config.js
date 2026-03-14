/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
      {
        source: '/de',
        destination: '/en',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
