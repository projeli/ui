import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/navigation/breadcrumbs";
import ProjectArchiveDialog from "@/components/project/project-archive-dialog";
import ProjectDeleteDialog from "@/components/project/project-delete-dialog";
import ProjectImage from "@/components/project/project-image";
import ProjectImageForm from "@/components/project/project-image-form";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import ProjectUpdateDetailsForm from "@/components/project/project-update-details-form";
import ProjectUpdateTagsForm from "@/components/project/project-update-tags-form";
import { Card } from "@/components/ui/card";
import { projectApi } from "@/lib/api/project/project-api";
import { ProjectMemberPermissions } from "@/lib/types/project-types";
import { getProjectMember, hasProjectPermission } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { forbidden, notFound, unauthorized } from "next/navigation";

export default async function Page({
    params,
}: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;

    const { userId } = await auth();

    if (!userId) return unauthorized();

    const project = await projectApi.getBySlug(slug);

    if (!project) return notFound();

    const projectMember = getProjectMember(userId, project);

    if (!projectMember) return forbidden();

    const hasEditDetailsPermission = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.EditProject
    );
    const hasManageTagsPermission = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.ManageTags
    );
    const hasArchiveProjectPermissions = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.ArchiveProject
    );
    const hasDeleteProjectPermission = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.DeleteProject
    );

    if (
        !hasEditDetailsPermission &&
        !hasManageTagsPermission &&
        !hasArchiveProjectPermissions &&
        !hasDeleteProjectPermission
    ) {
        return forbidden();
    }

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardProject(project, [{ label: "Details" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardProjectNavigation
                        project={project}
                        projectMember={projectMember}
                    />
                </div>
                <div className="grid gap-4 h-max">
                    <ProjectInfoBanner
                        project={project}
                        projectMember={projectMember}
                    />
                    <Card className="h-max p-6">
                        <ProjectImageForm
                            projectId={project.id}
                            projectImageComponent={
                                <ProjectImage project={project} />
                            }
                        />
                    </Card>
                    {hasEditDetailsPermission && (
                        <Card className="h-max p-6">
                            <h2 className="text-xl font-semibold">Details</h2>
                            <p className="text-muted-foreground text-sm mb-6">
                                Update your project details here.
                            </p>
                            <ProjectUpdateDetailsForm project={project} />
                        </Card>
                    )}
                    {hasManageTagsPermission && (
                        <ProjectUpdateTagsForm project={project} />
                    )}
                    {(hasDeleteProjectPermission ||
                        (hasArchiveProjectPermissions &&
                            project.status === "Published")) && (
                        <Card className="p-6 h-max grid gap-4 border-destructive">
                            <h2 className="text-xl font-semibold pb-4 border-b border-destructive">
                                Danger Zone
                            </h2>
                            {hasArchiveProjectPermissions &&
                                project.status === "Published" && (
                                    <div className="flex flex-wrap gap-4 justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                Archive Project
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Archive this wiki to remove it
                                                from the public view.
                                            </p>
                                        </div>
                                        <div className="flex w-full sm:w-max">
                                            <ProjectArchiveDialog
                                                project={project}
                                            />
                                        </div>
                                    </div>
                                )}
                            {hasDeleteProjectPermission && (
                                <div className="flex flex-wrap gap-4 justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Delete Project
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Permanently delete this project and
                                            its wikis.
                                        </p>
                                    </div>
                                    <div className="flex w-full sm:w-max">
                                        <ProjectDeleteDialog
                                            project={project}
                                        />
                                    </div>
                                </div>
                            )}
                        </Card>
                    )}
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
