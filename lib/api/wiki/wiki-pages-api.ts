import { ApiResponse } from "@/lib/types/api-response-types";
import { WikiPage } from "@/lib/types/wiki-types";
import { BaseApi } from "../base-api";

export class WikiPagesApi extends BaseApi {
    constructor() {
        super("wikis");
    }

    async getByWikiId(wikiId: string): Promise<WikiPage[]> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async create(
        wikiId: string,
        data: {
            name: string;
            slug: string;
            description: string;
        }
    ): Promise<ApiResponse<WikiPage>> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages`, {
            method: "POST",
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }

    async update(
        wikiId: string,
        id: string,
        data: {
            name: string;
            slug: string;
            description: string;
        }
    ): Promise<ApiResponse<WikiPage>> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }

    async delete(wikiId: string, id: string): Promise<ApiResponse<WikiPage>> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${id}`, {
            method: "DELETE",
        }).then((res) => res.json());
    }
}

export const wikiPagesApi = new WikiPagesApi();
