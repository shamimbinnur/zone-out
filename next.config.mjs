/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/p',
        destination: '/pomo',
        permanent: true,
      },
      {
        source: '/',
        destination: '/pomo',
        permanent: false,
      }
    ];
  }
};

export default nextConfig;
