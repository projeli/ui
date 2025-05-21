"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";

export const updateProjectMemberRoleAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await projectApi.updateMemberRole(
        formData.get("id") as string,
        formData.get("memberId") as string,
        formData.get("role") as string
    );

    if (response.success) {
        return {
            success: true,
            message: "Role updated successfully.",
            errors: {},
            data: response.data,
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
