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
                hostname: "cdn.projeli.com",
                port: "",
                pathname: "/projects/**",
            },
            {
                protocol: "https",
                hostname: "imgur.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.imgur.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn-raw.modrinth.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn.modrinth.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "github.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "img.shields.io",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.postimg.cc",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "wsrv.nl",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cf.way2muchnoise.eu",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "bstats.org",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "static.wikia.nocookie.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "5mb",
        },
        authInterrupts: true,
    },
    output: "standalone",
};

export default nextConfig;
