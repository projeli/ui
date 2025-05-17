"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";
import { z } from "zod";

export const updateProjectOwnershipAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const projectId = formData.get("projectId") as string;
    const userId = formData.get("userId") as string;

    const validationSchema = z.object({
        projectId: z.string().ulid(),
        userId: z.string().length(32).startsWith("user_"),
    });

    const validationResult = validationSchema.safeParse({
        projectId,
        userId,
    });

    if (!validationResult.success) {
        return {
            success: false,
            message: "Something went wrong. Please try refreshing the page.",
        };
    }

    const response = await projectApi.updateOwnership(
        validationResult.data.projectId,
        validationResult.data.userId
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${validationResult.data.projectId}/members`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
