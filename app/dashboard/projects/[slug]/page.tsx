import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProjects,
} from "@/components/notification/breadcrumbs";
import ProjectHeader from "@/components/project/project-header";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import { Card } from "@/components/ui/card";
import WikiStatistics from "@/components/wiki/wiki-statistics";
import { projectApi } from "@/lib/api/project/project-api";
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

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardProjects([{ label: project.name }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardProjectNavigation project={project} />
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-4 h-max">
                        <ProjectInfoBanner project={project} />
                        <DashboardGrid
                            className="grid-rows-[max-content,max-content,1fr] gap-4"
                            reverse
                        >
                            <Card className="p-6 h-max col-span-2">
                                <ProjectHeader
                                    project={project}
                                    className="border-none p-0"
                                />
                            </Card>
                            <Card className="p-6 h-max grid gap-4">
                                <h2 className="text-xl font-semibold pb-4 border-b border-border">
                                    Recent Activity
                                </h2>
                            </Card>
                            <Suspense fallback={null}>
                                <WikiStatistics projectSlug={slug} />
                            </Suspense>
                        </DashboardGrid>
                    </div>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
