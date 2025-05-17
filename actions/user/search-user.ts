"use server";

import { userApi } from "@/lib/api/user/user-api";
import { ApiResponse } from "@/lib/types/api-response-types";
import { CustomServerAction } from "@/lib/types/form-types";
import { ProjeliUser } from "@/lib/types/user-types";

export const searchUserAction: CustomServerAction<
    ApiResponse<ProjeliUser[]>
> = async (
    currentState: ApiResponse<ProjeliUser[]>,
    formData: FormData
) => {
    const query = formData.get("query") as string;
    return await userApi.searchByUsername(query);
};
