/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SERVER_URL: process.env.SERVER_URL,
        APP_URL: process.env.APP_URL
    },
};

export default nextConfig;
