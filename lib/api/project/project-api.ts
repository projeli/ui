import { Project } from "@/lib/types/project-types";
import { BaseApi } from "../base-api";

export class ProjectApi extends BaseApi {
    constructor() {
        super("projects");
    }

    async get(): Promise<Project[]> {
        return this.fetchService("/v1/projects")
            .then((res) => res.json())
            .then((res) => res.data);
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

    async createProject(data: { name: string }) {
        return this.fetchService("/projects", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateProject(id: string, data: { name: string }) {
        return this.fetchService(`/v1/projects/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    async deleteProject(id: string) {
        return this.fetchService(`/v1/projects/${id}`, {
            method: "DELETE",
        });
    }
}

export const projectApi = new ProjectApi();
