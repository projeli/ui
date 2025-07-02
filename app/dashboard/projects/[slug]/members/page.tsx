import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/navigation/breadcrumbs";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import ProjectMembersDashboard from "@/components/project/project-members-dashboard";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { projectApi } from "@/lib/api/project/project-api";
import { userApi } from "@/lib/api/user/user-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { getProjectMember } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { forbidden, notFound, unauthorized } from "next/navigation";
import { Suspense } from "react";

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

    const [project, wiki] = await Promise.all([
        projectApi.getBySlug(slug),
        wikiApi.getByProjectSlug(slug),
    ]);

    if (!project) return notFound();

    const projectMember = getProjectMember(userId, project);

    if (!projectMember) return forbidden();

    const members =
        (await userApi.getByIds(
            project.members.map((member) => member.userId)
        )) || [];

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardProject(project, [{ label: "Members" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardProjectNavigation
                        project={project}
                        projectMember={projectMember}
                    />
                </div>
                <div className="grid grid-rows-[max-content_1fr] gap-4">
                    <ProjectInfoBanner
                        project={project}
                        projectMember={projectMember}
                    />
                    <div>
                        <Suspense
                            fallback={
                                <Card className="p-6 h-max">
                                    <LoadingSpinner />
                                </Card>
                            }
                        >
                            <ProjectMembersDashboard
                                project={project}
                                wiki={wiki}
                                members={members.sort((a, b) =>
                                    a.userName.localeCompare(b.userName)
                                )}
                                currentUserId={userId}
                            />
                        </Suspense>
                    </div>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
