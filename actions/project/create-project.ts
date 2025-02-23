"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const createProjectAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await projectApi.create({
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        summary: formData.get("summary") as string,
        content: formData.get("content") as string,
        category: formData.get("category") as string,
        tags: formData.getAll("tags") as string[],
        imageUrl: formData.get("imageUrl") as string,
        isPublished: formData.get("isPublished") === "on",
    });

    if (response.success) {
        throw redirect("/dashboard/projects");
    }

    return {
        message: response.message,
        errors: response.errors,
    };
};
