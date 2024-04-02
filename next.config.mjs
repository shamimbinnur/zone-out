/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/t',
        destination: '/tool/pomo',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
