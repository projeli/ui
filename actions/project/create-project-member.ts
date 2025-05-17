"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createProjectMemberAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const validationSchema = z.object({
        projectId: z.string().ulid(),
        userId: z.string().length(32).startsWith("user_"),
    });

    const projectId = formData.get("projectId") as string;
    const userId = formData.get("userId") as string;

    const validationResult = validationSchema.safeParse({
        projectId,
        userId,
    });

    if (!validationResult.success) {
        return {
            success: false,
            message: "Please select a user.",
        };
    }

    const response = await projectApi.addMember(
        validationResult.data.projectId,
        validationResult.data.userId
    );

    if (!response.success) {
        return {
            success: false,
            message: response.message,
        };
    }

    redirect(`/dashboard/projects/${validationResult.data.projectId}/members`);
};
