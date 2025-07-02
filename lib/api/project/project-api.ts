import { ApiResponse, PagedApiResponse } from "@/lib/types/api-response-types";
import { Project, ProjectLink, ProjectMember } from "@/lib/types/project-types";
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

    async getByIds(ids: string[]): Promise<Project[]> {
        return this.fetchService(
            this.createPathWithQueryParams("/v1/projects", { ids })
        )
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async create(
        name: string,
        slug: string,
        summary: string,
        category: string,
        image: File,
    ): Promise<ApiResponse<Project>> {
        const formData = new FormData();

        formData.append("Name", name);
        formData.append("Slug", slug);
        formData.append("Summary", summary);
        formData.append("Category", category);
        formData.append("Image", image);

        return this.fetchService("/v1/projects", {
            method: "POST",
            body: formData,
            headers: {},
        })
            .then((res) => {
                const contentType = res.headers.get("Content-Type") || "";
            
                const jsonContentTypeRegex = /^application\/(.*\+)?json(;.*)?$/i;
            
                if (jsonContentTypeRegex.test(contentType)) {
                    return res.json();
                }

                console.error("Invalid response while creating project", res);
                return {
                    success: false,
                    message: "Invalid response",
                    data: null,
                };
            });
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

    async updateLinks(
        id: string,
        links: ProjectLink[]
    ): Promise<ApiResponse<Project>> {
        return this.fetchService(`/v1/projects/${id}/links`, {
            method: "PUT",
            body: JSON.stringify({ links }),
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async updateStatus(
        id: string,
        status: string
    ): Promise<ApiResponse<Project>> {
        return this.fetchService(`/v1/projects/${id}/status`, {
            method: "PUT",
            body: JSON.stringify({ status }),
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async updateImage(
        id: string,
        image: File
    ): Promise<ApiResponse<Project>> {
        const formData = new FormData();

        formData.append("Image", image);

        return this.fetchService(`/v1/projects/${id}/image`, {
            method: "PUT",
            body: formData,
            headers: {},
        })
            .then((res) => {
                const contentType = res.headers.get("Content-Type") || "";
            
                const jsonContentTypeRegex = /^application\/(.*\+)?json(;.*)?$/i;
            
                if (jsonContentTypeRegex.test(contentType)) {
                    return res.json();
                }

                console.error("Invalid response while updating project image", res);
                return {
                    success: false,
                    message: "Invalid response",
                    data: null,
                };
            });
    }

    async updateOwnership(
        id: string,
        userId: string
    ): Promise<ApiResponse<Project>> {
        return this.fetchService(`/v1/projects/${id}/ownership`, {
            method: "PUT",
            body: JSON.stringify({ userId }),
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async delete(id: string): Promise<ApiResponse<Project>> {
            return this.fetchService(`/v1/projects/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .catch((error) => error.json());
        }

    async deleteImage(id: string): Promise<ApiResponse<Project>> {
        return this.fetchService(`/v1/projects/${id}/image`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .catch((error) => error.json());
    }

    async addMember(
        id: string,
        userId: string
    ): Promise<ApiResponse<ProjectMember>> {
        return this.fetchService(`/v1/projects/${id}/members`, {
            method: "POST",
            body: JSON.stringify({ userId }),
        })
            .then((res) => res.json());
    }

    async updateMemberRole(
        id: string,
        userId: string,
        role: string
    ): Promise<ApiResponse<ProjectMember>> {
        return this.fetchService(`/v1/projects/${id}/members/${userId}/role`, {
            method: "PUT",
            body: JSON.stringify({ role }),
        })
            .then((res) => res.json());
    }

    async updateMemberPermissions(
        id: string,
        userId: string,
        permissions: string
    ): Promise<ApiResponse<ProjectMember>> {
        return this.fetchService(`/v1/projects/${id}/members/${userId}/permissions`, {
            method: "PUT",
            body: JSON.stringify({ permissions }),
        })
            .then((res) => res.json());
    }

    async deleteMember(
        id: string,
        userId: string
    ): Promise<ApiResponse<ProjectMember>> {
        return this.fetchService(`/v1/projects/${id}/members/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json());
    }
}

export const projectApi = new ProjectApi();
