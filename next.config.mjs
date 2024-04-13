/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    domains: ['idehalmag.com','seeklogo.com','tailwindui.com','amiri.com','media.licdn.com','www.funkypigeon.com','png.pngtree.com']
  },
  env: {
    privateKey: 'dsasfdfakfdskjdffdsdfas'
  },
  output: 'standalone',
};

export default nextConfig;
