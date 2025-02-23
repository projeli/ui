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
}

export const userApi = new UserApi();
