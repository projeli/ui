import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import PageContainer from "@/components/layout/page-container";
import Anchor from "@/components/navigation/anchor";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/notification/breadcrumbs";
import ProjectHeader from "@/components/project/project-header";
import { Card } from "@/components/ui/card";
import WikiCreateForm from "@/components/wiki/wiki-create-form";
import WikiInfoBanner from "@/components/wiki/wiki-info-banner";
import WikiStatistics from "@/components/wiki/wiki-statistics";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { auth } from "@clerk/nextjs/server";
import { notFound, unauthorized } from "next/navigation";
import { Suspense } from "react";
import { match, P } from "ts-pattern";

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
    if (!wiki) return notFound();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardProject(project, [{ label: "Wiki" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation project={project} wiki={wiki} />
                </div>
                <div className="flex flex-col gap-4">
                    <WikiInfoBanner wiki={wiki} project={project} />
                    <DashboardGrid
                        className="grid-rows-[max-content,1fr] gap-4"
                        reverse
                    >
                        <Card className="p-6 h-max col-span-2">
                            <ProjectHeader
                                project={project}
                                className="border-none p-0"
                                simple
                            />
                        </Card>
                        {match(wiki)
                            .with({ status: P.not("Uncreated") }, () => (
                                <>
                                    <Card className="p-6 h-max grid gap-4">
                                        <h2 className="text-xl font-semibold pb-4 border-b border-border">
                                            Recent Activity
                                        </h2>
                                    </Card>
                                    <Suspense fallback={null}>
                                        <WikiStatistics projectSlug={slug} wikiId={wiki.id} />
                                    </Suspense>
                                </>
                            ))
                            .with({ status: "Uncreated" }, () => (
                                <WikiCreateForm
                                    projectName={project.name}
                                    wikiId={wiki.id}
                                />
                            ))
                            .otherwise(() => null)}
                    </DashboardGrid>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
