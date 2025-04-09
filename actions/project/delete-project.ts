"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const deleteProjectAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await projectApi.delete(
        formData.get("id") as string
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
