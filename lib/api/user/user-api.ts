import { ApiResponse } from "@/lib/types/api-response-types";
import { ProjeliUser } from "@/lib/types/user-types";
import { BaseApi } from "../base-api";

export class UserApi extends BaseApi {
    constructor() {
        super("users");
    }

    async getByIds(ids: string[]): Promise<ProjeliUser[]> {
        return this.fetchService(
            this.createPathWithQueryParams("/v1/users", { ids })
        )
            .then((res) => res.json())
            .then((res) => res.data);
    }

    async searchByUsername(
        username: string
    ): Promise<ApiResponse<ProjeliUser[]>> {
        return this.fetchService(
            this.createPathWithQueryParams("/v1/users", { username })
        )
            .then((res) => res.json());
    }

    async createUser(user: ProjeliUser): Promise<ApiResponse<ProjeliUser>> {
        return this.fetchService("/v1/users", {
            method: "POST",
            body: JSON.stringify(user),
        })
            .then((res) => res.json());
    }

    async updateUser(user: ProjeliUser): Promise<ApiResponse<ProjeliUser>> {
        return this.fetchService(`/v1/users/${user.userId}`, {
            method: "PUT",
            body: JSON.stringify(user),
        })
            .then((res) => res.json());
    }

    async deleteUser(userId: string): Promise<ApiResponse<ProjeliUser>> {
        return this.fetchService(`/v1/users/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json());
    }
}

export const userApi = new UserApi();
