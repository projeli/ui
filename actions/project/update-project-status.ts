"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const updateProjectStatusAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await projectApi.updateStatus(
        formData.get("id") as string,
        formData.get("status") as string
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${response.data?.slug}`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
