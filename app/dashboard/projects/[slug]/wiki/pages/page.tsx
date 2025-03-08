import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWiki,
} from "@/components/notification/breadcrumbs";
import { Card } from "@/components/ui/card";
import WikiCreatePageDialog from "@/components/wiki/wiki-create-page-dialog";
import { WikiPagesTable } from "@/components/wiki/wiki-pages-table";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
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

    const [project, wiki, pages] = await Promise.all([
        projectApi.getBySlug(slug),
        wikiApi.getByProjectSlug(slug),
        wikiPageApi.getByProjectSlug(slug),
    ]);

    if (!project) return notFound();
    if (!wiki || !["Published", "Draft"].includes(wiki.status))
        return notFound();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWiki(project, [{ label: "Pages" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation project={project} wiki={wiki} />
                </div>
                <div className="grid gap-6">
                    <Card className="p-6 h-max">
                        <div className="flex justify-between items-end gap-4 pb-4 border-b">
                            <div>
                                <h2 className="text-xl font-semibold">Pages</h2>
                                <p className="text-sm text-muted-foreground max-w-xl">
                                    Create and manage your wiki pages.
                                </p>
                            </div>
                            <div>
                                <WikiCreatePageDialog
                                    projectSlug={slug}
                                    wikiId={wiki.id}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <WikiPagesTable
                                projectSlug={slug}
                                wikiId={wiki.id}
                                pages={pages}
                            />
                        </div>
                    </Card>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
