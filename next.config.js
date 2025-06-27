/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    images: {
        domains: ["blobgeekimagedata.blob.core.windows.net","picsum.photos","randomuser.me"],
    },
};

module.exports = nextConfig;