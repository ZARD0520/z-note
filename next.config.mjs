/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
      {
        protocol: 'http',
        hostname: '43.136.119.247',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'bkimg.cdn.bcebos.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'wezard.net',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
