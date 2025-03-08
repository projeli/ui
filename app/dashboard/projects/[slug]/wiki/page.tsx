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
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { auth } from "@clerk/nextjs/server";
import { notFound, unauthorized } from "next/navigation";
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
                <div className="grid gap-6">
                    <DashboardGrid
                        className="grid-rows-[max-content,1fr]"
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
                            .with(
                                { status: P.union("Published", "Draft") },
                                () => (
                                    <>
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
                                                            {
                                                                project.members
                                                                    .length
                                                            }
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
                                    </>
                                )
                            )
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
