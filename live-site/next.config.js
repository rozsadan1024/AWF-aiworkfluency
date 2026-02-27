/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/hu',
        permanent: false,
      },
{
        source: '/de',
        destination: '/hu',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
