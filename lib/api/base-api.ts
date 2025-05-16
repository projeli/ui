import { auth } from "@clerk/nextjs/server";

export class BaseApi {
    private service: string;

    constructor(service: string) {
        this.service = service;
    }

    async fetch(url: string, config?: RequestInit) {
        if (process.env.NODE_ENV === "development" || true) {
            console.log("making request to: ", url);
        }
        return fetch(url, config);
    }

    async fetchService(url: string, config?: RequestInit) {
        const headers = config?.headers as HeadersInit;

        const { getToken } = await auth();
        const token = await getToken();

        if (!headers) {
            config = {
                ...config,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
        } else {
            config = {
                ...config,
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        }

        return this.fetch(
            `${process.env.GATEWAY_URL}/api/${this.service}${url}`,
            config
        );
    }

    createPathWithQueryParams(
        path: string,
        searchParams:
            | Record<string, string | string[] | number | undefined>
            | undefined
    ) {
        if (!searchParams) {
            return path;
        }

        if (Object.keys(searchParams).length === 0) {
            return path;
        }
        const individualSearchParams = Object.entries(searchParams).map(
            ([key, value]) => {
                if (value === undefined) {
                    return "";
                }
                if (Array.isArray(value)) {
                    return value
                        .filter((x) => x !== undefined)
                        .map((val) => `${key}=${val}`)
                        .join("&");
                }
                return `${key}=${value}`;
            }
        );
        const searchParamsString = individualSearchParams
            .filter(Boolean)
            .join("&");
        return `${path}?${searchParamsString}`;
    }
}
