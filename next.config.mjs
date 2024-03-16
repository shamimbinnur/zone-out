/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tool/pomodoro',
        permanent: false,
      },
    ];
  }
};

export default nextConfig;
