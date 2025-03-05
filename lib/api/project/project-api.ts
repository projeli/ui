import { ApiResponse, PagedApiResponse } from "@/lib/types/api-response-types";
import { Project } from "@/lib/types/project-types";
import { BaseApi } from "../base-api";

export class ProjectApi extends BaseApi {
    constructor() {
        super("projects");
    }

    async get(searchParams: {
        query?: string;
        order?: string;
        categories?: string[];
        tags?: string[];
        page?: string;
        pageSize?: string;
        userId?: string;
    }): Promise<PagedApiResponse<Project>> {
        return this.fetchService(
            this.createPathWithQueryParams("/v1/projects", searchParams)
        ).then((res) => res.json());
    }

    async getById(id: string): Promise<Project> {
        return this.fetchService(`/v1/projects/${id}`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async getBySlug(slug: string): Promise<Project> {
        return this.fetchService(`/v1/projects/${slug}`)
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async create(data: {
        name: string;
        slug: string;
        summary: string;
        category: string;
    }): Promise<ApiResponse<Project>> {
        return this.fetchService("/v1/projects", {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async updateDetails(
        id: string,
        data: {
            name: string;
            slug: string;
            summary?: string;
            category: string;
        }
    ): Promise<ApiResponse<Project>> {
        return this.fetchService(`/v1/projects/${id}/details`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async updateDescription(
        id: string,
        content: string
    ): Promise<ApiResponse<Project>> {
        return this.fetchService(`/v1/projects/${id}/content`, {
            method: "PUT",
            body: JSON.stringify({ content }),
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async updateTags(
        id: string,
        tags: string[]
    ): Promise<ApiResponse<Project>> {
        return this.fetchService(`/v1/projects/${id}/tags`, {
            method: "PUT",
            body: JSON.stringify({ tags }),
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async deleteProject(id: string) {
        return this.fetchService(`/v1/projects/${id}`, {
            method: "DELETE",
        });
    }
}

export const projectApi = new ProjectApi();
