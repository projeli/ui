"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const updateProjectImageAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await projectApi.updateImage(
        formData.get("id") as string,
        formData.get("image") as File
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
