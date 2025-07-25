import { ApiResponse, PagedApiResponse } from "@/lib/types/api-response-types";
import {
    Wiki,
    WikiEvent,
    WikiEventType,
    WikiSidebar,
    WikiStatistics,
    WikiStatus,
} from "@/lib/types/wiki-types";
import { BaseApi } from "../base-api";

export class WikiApi extends BaseApi {
    constructor() {
        super("wikis");
    }

    async getByProjectId(projectId: string): Promise<Wiki> {
        return this.fetchService(`/v1/wikis/project/${projectId}`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByProjectSlug(projectSlug: string): Promise<Wiki> {
        return this.fetchService(`/v1/wikis/project/${projectSlug}`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getStatistics(wikiId: string): Promise<WikiStatistics> {
        return this.fetchService(`/v1/wikis/${wikiId}/statistics`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getByIds(ids: string[]): Promise<Wiki[]> {
        return this.fetchService(
            this.createPathWithQueryParams("/v1/wikis", { ids })
        )
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async create({
        projectId,
        projectName,
        projectSlug,
        projectImageUrl,
        members,
    }: {
        projectId: string;
        projectName: string;
        projectSlug: string;
        projectImageUrl?: string;
        members: { userId: string; isOwner: boolean }[];
    }): Promise<ApiResponse<Wiki>> {
        return this.fetchService("/v1/wikis", {
            method: "POST",
            body: JSON.stringify({
                projectId,
                projectName,
                projectSlug,
                projectImageUrl,
                members,
            }),
        })
            .then(async (res) => {
                const contentType = res.headers.get("Content-Type") || "";
                
                const jsonContentTypeRegex = /^application\/(.*\+)?json(;.*)?$/i;
                
                if (jsonContentTypeRegex.test(contentType)) {
                    return res.json();
                }
            
                console.error("Invalid response while creating wiki:", res);

                if (Number(res.headers.get("Content-Length") ?? 0) > 0) {
                    console.error("Response body:", await res.text());
                }

                return {
                    success: false,
                    message: "Invalid response",
                    data: null,
                };
            });
    }

    async updateStatus(
        id: string,
        status: WikiStatus
    ): Promise<ApiResponse<Wiki>> {
        return this.fetchService(`/v1/wikis/${id}/status`, {
            method: "PUT",
            body: JSON.stringify({ status }),
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async updateDescription(
        id: string,
        content: string
    ): Promise<ApiResponse<Wiki>> {
        return this.fetchService(`/v1/wikis/${id}/content`, {
            method: "PUT",
            body: JSON.stringify({ content }),
        })
            .then((res) => {
                return res.json();
            })
            .catch((error) => {
                console.error("error", error);
                return error.json();
            });
    }

    async updateSidebar(
        id: string,
        sidebar: WikiSidebar
    ): Promise<ApiResponse<Wiki>> {
        return this.fetchService(`/v1/wikis/${id}/sidebar`, {
            method: "PUT",
            body: JSON.stringify({ sidebar }),
        }).then((res) => res.json());
    }

    async delete(id: string): Promise<ApiResponse<Wiki>> {
        return this.fetchService(`/v1/wikis/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json());
    }

    async updateMemberPermissions(
        wikiId: string,
        wikiMemberId: string,
        permissions: string
    ): Promise<ApiResponse<Wiki>> {
        return this.fetchService(
            `/v1/wikis/${wikiId}/members/${wikiMemberId}/permissions`,
            {
                method: "PUT",
                body: JSON.stringify({ permissions }),
            }
        )
            .then((res) => res.json());
    }

    async getEvents(
        wikiId: string,
        searchParams?: {
            userIds?: string[];
            eventTypes?: WikiEventType[];
            page?: number;
            pageSize?: number;
        }
    ): Promise<PagedApiResponse<WikiEvent>> {
        return this.fetchService(this.createPathWithQueryParams(`/v1/wikis/${wikiId}/events`, searchParams))
            .then((res) => res.json())
            .catch((error) => error.json());
    }
}

export const wikiApi = new WikiApi();
