import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/navigation/breadcrumbs";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import ProjectUpdateDescriptionForm from "@/components/project/project-update-content-form";
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

    if (
        !projectMember ||
        !hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.EditProject
        )
    )
        return forbidden();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardProject(project, [
                    { label: "Description" },
                ])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardProjectNavigation
                        project={project}
                        projectMember={projectMember}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <ProjectInfoBanner
                        project={project}
                        projectMember={projectMember}
                    />
                    <ProjectUpdateDescriptionForm project={project} />
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
