"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { ProjectLink } from "@/lib/types/project-types";

export const updateProjectLinksAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    console.log("Updating project links with form data:", formData);

    const linksString = formData.get("links") as string;
    const links = JSON.parse(linksString) as ProjectLink[];

    const response = await projectApi.updateLinks(
        formData.get("id") as string,
        links.map((link, index) => ({
            id: link.id ? link.id : undefined,
            name: link.name,
            url: link.url,
            type: link.type,
            order: index,
        } as any))
    );

    if (response.success) {
        return {
            success: true,
            message: "Links updated successfully.",
            errors: {},
        };
    }

    console.error("Failed to update project links:", response);

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
