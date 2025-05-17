"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export const deleteProjectMemberAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const projectId = formData.get("projectId") as string;
    const userId = formData.get("userId") as string;
    const currentUserId = (await auth()).userId;

    if (!currentUserId) {
        return {
            success: false,
            message: "You are not logged in.",
        };
    }

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

    const response = await projectApi.deleteMember(
        validationResult.data.projectId,
        validationResult.data.userId
    );

    if (response.success) {
        if (userId === currentUserId) {
            throw redirect(
                `/dashboard/projects`
            );
        } else{
            throw redirect(
                `/dashboard/projects/${validationResult.data.projectId}/members`
            );
        }
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
