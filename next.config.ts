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
