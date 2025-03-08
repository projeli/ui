import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import Anchor from "@/components/navigation/anchor";
import {
    Breadcrumbs,
    withDashboardProjects,
} from "@/components/notification/breadcrumbs";
import ProjectHeader from "@/components/project/project-header";
import { Card } from "@/components/ui/card";
import { projectApi } from "@/lib/api/project/project-api";
import { auth } from "@clerk/nextjs/server";
import { notFound, unauthorized } from "next/navigation";

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
                    <DashboardGrid
                        className="grid-rows-[max-content,1fr]"
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
                        <Card className="p-6 h-max grid gap-4">
                            <h2 className="text-xl font-semibold pb-4 border-b border-border">
                                Statistics
                            </h2>
                            <div className="bg-muted rounded-lg p-4 border">
                                {project.members.length > 1 ? (
                                    <>
                                        <p className="text-xl font-semibold">
                                            {project.members.length}
                                        </p>
                                        <p className="text-base flex items-center gap-2 text-muted-foreground">
                                            Members
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-xl font-semibold">
                                            1
                                        </p>
                                        <p className="text-base flex items-center gap-2 text-muted-foreground">
                                            Member
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="bg-muted rounded-lg p-4 border">
                                {1000 > 1 ? (
                                    <>
                                        <p className="text-xl font-semibold">
                                            1000
                                        </p>
                                        <p className="text-base flex items-center gap-2 text-muted-foreground">
                                            Wiki Pages
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-xl font-semibold">
                                            1
                                        </p>
                                        <p className="text-base flex items-center gap-2 text-muted-foreground">
                                            Wiki Page
                                        </p>
                                    </>
                                )}
                            </div>
                            <Anchor
                                href={`/dashboard/projects/${project.slug}/analytics`}
                                variant="outline"
                                className="w-full"
                            >
                                View analytics
                            </Anchor>
                        </Card>
                    </DashboardGrid>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
