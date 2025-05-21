"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const updateProjectDetailsAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const projectId = formData.get("id") as string;

    const existingProject = await projectApi.getById(projectId);

    if (!existingProject) {
        return {
            success: false,
            message: "Project not found",
            errors: {
                all: ["Project not found"],
            },
        };
    }

    const newSlug = formData.get("slug") as string;

    const response = await projectApi.updateDetails(projectId, {
        name: formData.get("name") as string,
        slug: newSlug,
        summary: formData.get("summary") as string,
        category: formData.get("category") as string,
    });

    if (response.success) {
        if (newSlug !== existingProject.slug) {
            return redirect(`/dashboard/projects/${newSlug}/details`);
        }

        return {
            success: true,
            message: "Project updated successfully.",
            errors: {},
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
