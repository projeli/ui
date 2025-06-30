import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/navigation/breadcrumbs";
import ProjectHeader from "@/components/project/project-header";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import WikiCreateForm from "@/components/wiki/wiki-create-form";
import WikiEventFilters from "@/components/wiki/wiki-event-filters";
import WikiEventsContainer from "@/components/wiki/wiki-events-container";
import WikiInfoBanner from "@/components/wiki/wiki-info-banner";
import WikiStatistics from "@/components/wiki/wiki-statistics";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiEventNames, WikiEventType } from "@/lib/types/wiki-types";
import { getProjectMember, getWikiMember } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { forbidden, notFound, unauthorized } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        types: string | string[];
    }>;
}) {
    const { slug } = await params;
    const sp = await searchParams;

    const eventTypes = (Array.isArray(sp.types) ? sp.types : [sp.types]).filter(
        (type) => Object.keys(wikiEventNames).includes(type)
    ) as WikiEventType[];

    const { userId } = await auth();
    if (!userId) return unauthorized();

    const [project, wiki] = await Promise.all([
        projectApi.getBySlug(slug),
        wikiApi.getByProjectSlug(slug),
    ]);

    if (!project) return notFound();

    const projectMember = getProjectMember(userId, project);
    const wikiMember = getWikiMember(userId, wiki);

    if (!projectMember) return forbidden();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardProject(project, [{ label: "Wiki" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation
                        project={project}
                        wiki={wiki}
                        projectMember={projectMember}
                        wikiMember={wikiMember}
                    />
                </div>
                {wiki && wikiMember ? (
                    <div className="flex flex-col gap-4">
                        <WikiInfoBanner
                            wiki={wiki}
                            wikiMember={wikiMember}
                        />
                        <Card className="p-6 h-max lg:col-span-2">
                            <ProjectHeader
                                project={project}
                                className="border-none p-0"
                                simple
                            />
                        </Card>
                        <DashboardGrid className="gap-4 h-full" reverse>
                            <Card className="p-6 h-max grid gap-4 order-2 lg:order-1">
                                <div className="flex gap-4 items-center justify-between pb-4 border-b border-border">
                                    <h2 className="text-xl font-semibold">
                                        Recent Activity
                                    </h2>
                                    <WikiEventFilters eventTypes={eventTypes} />
                                </div>
                                <Suspense
                                    fallback={
                                        <div className="flex justify-center gap-2">
                                            <LoadingSpinner className="size-4" />
                                            Loading activities...
                                        </div>
                                    }
                                >
                                    <WikiEventsContainer
                                        wikiId={wiki.id}
                                        eventTypes={eventTypes}
                                    />
                                </Suspense>
                            </Card>
                            <div className="order-1 lg:order-2">
                                <Suspense fallback={null}>
                                    <WikiStatistics
                                        projectSlug={slug}
                                        wikiId={wiki.id}
                                    />
                                </Suspense>
                            </div>
                        </DashboardGrid>
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        {projectMember.isOwner ? (
                            <WikiCreateForm project={project} />
                        ) : (
                            <p className="text-muted-foreground">
                                The owner of this project has not created a wiki
                                yet.
                            </p>
                        )}
                    </div>
                )}
            </DashboardGrid>
        </PageContainer>
    );
}
