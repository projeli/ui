import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/notification/breadcrumbs";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import ProjectMembersDashboard from "@/components/project/project-members-dashboard";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { projectApi } from "@/lib/api/project/project-api";
import { userApi } from "@/lib/api/user/user-api";
import { auth } from "@clerk/nextjs/server";
import { notFound, unauthorized } from "next/navigation";
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

    const project = await projectApi.getBySlug(slug);

    if (!project) return notFound();

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
                    <DashboardProjectNavigation project={project} />
                </div>
                <div className="grid grid-rows-[max-content,1fr] gap-4">
                    <ProjectInfoBanner project={project} />
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
