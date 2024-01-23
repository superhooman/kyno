import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        webpackBuildWorker: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.kino.kz',
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: "/bee.js",
                destination: "https://cdn.splitbee.io/sb.js",
            },
            {
                source: "/_hive/:slug",
                destination: "https://hive.splitbee.io/:slug",
            },
        ];
    },
};

export default withVanillaExtract(nextConfig);
