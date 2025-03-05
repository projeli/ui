"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";

export const updateProjectTagsAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await projectApi.updateTags(
        formData.get("id") as string,
        formData.getAll("tags") as string[]
    );

    if (response.success) {
        return {
            success: true,
            message: "Tags updated successfully",
            errors: {},
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
