/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    domains: ['idehalmag.com','seeklogo.com','tailwindui.com']
  },
  env: {
    privateKey: 'dsasfdfakfdskjdffdsdfas'
  },
  output: 'standalone',
};

export default nextConfig;
