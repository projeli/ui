"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";

export const updateProjectContentAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await projectApi.updateDescription(
        formData.get("id") as string,
        formData.get("content") as string
    );

    if (response.success) {
        return {
            success: true,
            message: "Description updated successfully.",
            errors: {},
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
