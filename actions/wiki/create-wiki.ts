"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const createWikiAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const projectId = formData.get("projectId") as string;

    const project = await projectApi.getById(projectId);

    const response = await wikiApi.create({
        projectId,
        projectName: project.name,
        projectSlug: project.slug,
        projectImageUrl: project.imageUrl,
        members: project.members.map((member) => ({
            userId: member.userId,
            isOwner: member.isOwner,
        })),
    });

    if (response.success) {
        throw redirect(`/dashboard/projects/${project.slug}/wiki`);
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
