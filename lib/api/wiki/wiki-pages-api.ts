import { ApiResponse } from "@/lib/types/api-response-types";
import { WikiPage, WikiPageStatus, WikiSidebar } from "@/lib/types/wiki-types";
import { BaseApi } from "../base-api";

export class WikiPageApi extends BaseApi {
    constructor() {
        super("wikis");
    }

    async getByWikiId(wikiId: string): Promise<WikiPage[]> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectId(projectId: string): Promise<WikiPage[]> {
        return this.fetchService(`/v1/wikis/${projectId}/pages/project`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectSlug(projectSlug: string): Promise<WikiPage[]> {
        return this.fetchService(`/v1/wikis/${projectSlug}/pages/project`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getById(wikiId: string, id: string): Promise<WikiPage> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${id}`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getBySlug(wikiId: string, slug: string): Promise<WikiPage> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${slug}`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectIdAndId(
        projectId: string,
        id: string
    ): Promise<WikiPage> {
        return this.fetchService(`/v1/wikis/${projectId}/pages/${id}/project`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectIdAndSlug(
        projectId: string,
        slug: string
    ): Promise<WikiPage> {
        return this.fetchService(`/v1/wikis/${projectId}/pages/${slug}/project`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectSlugAndId(
        projectSlug: string,
        id: string
    ): Promise<WikiPage> {
        return this.fetchService(`/v1/wikis/${projectSlug}/pages/${id}/project`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectSlugAndSlug(
        projectSlug: string,
        slug: string
    ): Promise<WikiPage> {
        return this.fetchService(
            `/v1/wikis/${projectSlug}/pages/${slug}/project`
        )
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async create(
        wikiId: string,
        data: {
            title: string;
            slug: string;
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
            title: string;
            slug: string;
        }
    ): Promise<ApiResponse<WikiPage>> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }

    async updateContent(
        wikiId: string,
        id: string,
        content: string
    ): Promise<ApiResponse<WikiPage>> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${id}/content`, {
            method: "PUT",
            body: JSON.stringify({ content }),
        }).then((res) => res.json());
    }

    async updateCategories(
        wikiId: string,
        id: string,
        categoryIds: string[]
    ): Promise<ApiResponse<WikiPage>> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${id}/categories`, {
            method: "PUT",
            body: JSON.stringify({ categoryIds }),
        }).then((res) => res.json());
    }

    async updateStatus(
        wikiId: string,
        id: string,
        status: WikiPageStatus
    ): Promise<ApiResponse<WikiPage>> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${id}/status`, {
            method: "PUT",
            body: JSON.stringify({ status }),
        }).then((res) => res.json());
    }

    async delete(wikiId: string, id: string): Promise<ApiResponse<WikiPage>> {
        return this.fetchService(`/v1/wikis/${wikiId}/pages/${id}`, {
            method: "DELETE",
        }).then((res) => res.json());
    }
}

export const wikiPageApi = new WikiPageApi();
