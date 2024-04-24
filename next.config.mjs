/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/p',
        destination: '/pomo',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
