import { auth } from "@clerk/nextjs/server";

export class BaseApi {
    private service: string;

    constructor(service: string) {
        this.service = service;
    }

    async fetch(url: string, config?: RequestInit) {
        if (process.env.NODE_ENV === "development") {
            console.log("making request to: ", url);
        }
        return fetch(url, config);
    }

    async fetchService(url: string, config?: RequestInit) {
        const headers = config?.headers as HeadersInit;

        if (!headers) {
            const { getToken } = await auth();
            const token = await getToken();
        
            config = {
                ...config,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
        }

        return this.fetch(
            `${process.env.NEXT_PUBLIC_GATEWAY_URL}/api/${this.service}${url}`,
            config
        );
    }
}
