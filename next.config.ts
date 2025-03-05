import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const nextConfig: NextConfig = {
    images: {
        minimumCacheTTL: 10,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.modders.gg",
                port: "",
                pathname: "/avatars/**",
            },
            {
                protocol: "https",
                hostname: "cdn.modders.gg",
                port: "",
                pathname: "/user_banners/**",
            },
            {
                protocol: "https",
                hostname: "cdn.modders.gg",
                port: "",
                pathname: "/organizations/**",
            },
            {
                protocol: "https",
                hostname: "cdn.modders.gg",
                port: "",
                pathname: "/projects/**",
            },
            {
                protocol: "https",
                hostname: "media.forgecdn.net",
                port: "",
                pathname: "/avatars/**",
            },
            {
                protocol: "https",
                hostname: "cdn.modrinth.com",
                port: "",
                pathname: "/data/**",
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "5mb",
        },
        authInterrupts: true,
    },
};

export default nextConfig;
