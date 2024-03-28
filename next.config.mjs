/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tool/pomo',
        permanent: false,
      },
    ];
  }
};

export default nextConfig;
