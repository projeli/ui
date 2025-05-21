"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { ProjectMemberPermissions } from "@/lib/types/project-types";
import { WikiMemberPermissions } from "@/lib/types/wiki-types";

export const updateMemberPermissionsAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const projectId = formData.get("projectId") as string;
    const wikiId = formData.get("wikiId") as string | null | undefined;
    const projectMemberId = formData.get("projectMemberId") as string;
    const wikiMemberId = formData.get("wikiMemberId") as string | null | undefined;
    const permissions = JSON.parse(formData.get("permissions") as string) as Record<string, boolean>;

    console.log(formData);

    let projectPermissions = BigInt(0n);
    let wikiPermissions = BigInt(0n);

    if (permissions.editProject) projectPermissions |= BigInt(ProjectMemberPermissions.EditProject);
    if (permissions.publishProject) projectPermissions |= BigInt(ProjectMemberPermissions.PublishProject);
    if (permissions.manageLinks) projectPermissions |= BigInt(ProjectMemberPermissions.ManageLinks);
    if (permissions.addMembers) projectPermissions |= BigInt(ProjectMemberPermissions.AddProjectMembers);
    if (permissions.editRoles) projectPermissions |= BigInt(ProjectMemberPermissions.EditProjectMemberRoles);
    if (permissions.editPermissions) projectPermissions |= BigInt(ProjectMemberPermissions.EditProjectMemberPermissions);
    if (permissions.removeMembers) projectPermissions |= BigInt(ProjectMemberPermissions.DeleteProjectMembers);
    if (permissions.deleteProject) projectPermissions |= BigInt(ProjectMemberPermissions.DeleteProject);

    if (wikiId && wikiMemberId) {
        if (permissions.editWikiDetails) wikiPermissions |= BigInt(WikiMemberPermissions.EditWiki);
        if (permissions.createPages) wikiPermissions |= BigInt(WikiMemberPermissions.CreateWikiPages);
        if (permissions.editPages) wikiPermissions |= BigInt(WikiMemberPermissions.EditWikiPages);
        if (permissions.publishPages) wikiPermissions |= BigInt(WikiMemberPermissions.PublishWikiPages);
        if (permissions.deletePages) wikiPermissions |= BigInt(WikiMemberPermissions.DeleteWikiPages);
        if (permissions.createCategories) wikiPermissions |= BigInt(WikiMemberPermissions.CreateWikiCategories);
        if (permissions.editCategories) wikiPermissions |= BigInt(WikiMemberPermissions.EditWikiCategories);
        if (permissions.deleteCategories) wikiPermissions |= BigInt(WikiMemberPermissions.DeleteWikiCategories);
        if (permissions.deleteWiki) wikiPermissions |= BigInt(WikiMemberPermissions.DeleteWiki);
    }

    const response = await projectApi.updateMemberPermissions(
        projectId,
        projectMemberId,
        String(projectPermissions)
    );

    if (response.success && wikiId && wikiMemberId) {
        const wikiResponse = await wikiApi.updateMemberPermissions(
            wikiId,
            wikiMemberId,
            String(wikiPermissions)
        );

        if (!wikiResponse.success) {
            return {
                success: false,
                message: wikiResponse.message,
                errors: wikiResponse.errors,
            }
        }
    } else if (response.success === false) {
        return {
            success: false,
            message: response.message,
            errors: response.errors,
        }
    }

    return {
        success: true,
        message: "Permissions updated successfully.",
        errors: {},
        data: response.data,
    };
};
