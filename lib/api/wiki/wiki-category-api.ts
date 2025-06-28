import { ApiResponse } from "@/lib/types/api-response-types";
import { WikiCategory } from "@/lib/types/wiki-types";
import { BaseApi } from "../base-api";

export class WikiCategoryApi extends BaseApi {
    constructor() {
        super("wikis");
    }

    async getByWikiId(wikiId: string): Promise<WikiCategory[]> {
        return this.fetchService(`/v1/wikis/${wikiId}/categories`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectId(projectId: string): Promise<WikiCategory[]> {
        return this.fetchService(`/v1/wikis/${projectId}/categories/project`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectSlug(projectSlug: string): Promise<WikiCategory[]> {
        return this.fetchService(`/v1/wikis/${projectSlug}/categories/project`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getById(wikiId: string, id: string): Promise<WikiCategory> {
            return this.fetchService(`/v1/wikis/${wikiId}/categories/${id}`)
                .then((res) => res.json())
                .then((res) => res.data);
        }
    
        async getBySlug(wikiId: string, slug: string): Promise<WikiCategory> {
            return this.fetchService(`/v1/wikis/${wikiId}/categories/${slug}`)
                .then((res) => res.json())
                .then((res) => res.data);
        }
    
        async getByProjectIdAndId(
            projectId: string,
            id: string
        ): Promise<WikiCategory> {
            return this.fetchService(`/v1/wikis/${projectId}/categories/${id}/project`)
                .then((res) => res.json())
                .then((res) => res.data);
        }
    
        async getByProjectIdAndSlug(
            projectId: string,
            slug: string
        ): Promise<WikiCategory> {
            return this.fetchService(`/v1/wikis/${projectId}/categories/${slug}/project`)
                .then((res) => res.json())
                .then((res) => res.data);
        }
    
        async getByProjectSlugAndId(
            projectSlug: string,
            id: string
        ): Promise<WikiCategory> {
            return this.fetchService(`/v1/wikis/${projectSlug}/categories/${id}/project`)
                .then((res) => res.json())
                .then((res) => res.data);
        }
    
        async getByProjectSlugAndSlug(
            projectSlug: string,
            slug: string
        ): Promise<WikiCategory> {
            return this.fetchService(
                `/v1/wikis/${projectSlug}/categories/${slug}/project`
            )
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
    ): Promise<ApiResponse<WikiCategory>> {
        return this.fetchService(`/v1/wikis/${wikiId}/categories`, {
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
    ): Promise<ApiResponse<WikiCategory>> {
        return this.fetchService(`/v1/wikis/${wikiId}/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }

    async updatePages(
            wikiId: string,
            id: string,
            pageIds: string[]
        ): Promise<ApiResponse<WikiCategory>> {
            return this.fetchService(`/v1/wikis/${wikiId}/categories/${id}/pages`, {
                method: "PUT",
                body: JSON.stringify({ pageIds }),
            }).then((res) => res.json());
        }

    async delete(
        wikiId: string,
        id: string
    ): Promise<ApiResponse<WikiCategory>> {
        return this.fetchService(`/v1/wikis/${wikiId}/categories/${id}`, {
            method: "DELETE",
        }).then((res) => res.json());
    }
}

export const wikiCategoryApi = new WikiCategoryApi();
