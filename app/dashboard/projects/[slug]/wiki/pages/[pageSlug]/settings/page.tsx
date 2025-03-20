import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import DashboardWikiPageHeader from "@/components/dashboard/wiki/page/dashboard-wiki-page-header";
import DashboardWikiPageNavbar from "@/components/dashboard/wiki/page/dashboard-wiki-page-navbar";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWikiPages,
} from "@/components/notification/breadcrumbs";
import { Card } from "@/components/ui/card";
import WikiDeletePageDialog from "@/components/wiki/wiki-delete-page-dialog";
import WikiPageArchiveDialog from "@/components/wiki/wiki-page-archive-dialog";
import WikiUpdatePageForm from "@/components/wiki/wiki-update-page-form";
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
        pageSlug: string;
    }>;
}) {
    const { slug, pageSlug } = await params;

    const { userId } = await auth();
    if (!userId) return unauthorized();

    const [project, wiki, page] = await Promise.all([
        projectApi.getBySlug(slug),
        wikiApi.getByProjectSlug(slug),
        wikiPageApi.getByProjectSlugAndSlug(slug, pageSlug),
    ]);

    if (!project) return notFound();
    if (!wiki || wiki.status === "Uncreated") return notFound();
    if (!page) return notFound();

    console.log(page);

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWikiPages(project, [{ label: page.title }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation project={project} wiki={wiki} />
                </div>
                <div className="flex flex-col gap-4 h-full">
                    <DashboardWikiPageHeader
                        project={project}
                        page={page}
                        wikiId={wiki.id}
                    />
                    <DashboardWikiPageNavbar
                        projectSlug={project.slug}
                        pageSlug={page.slug}
                    />
                    <Card className="p-6 h-max">
                        <h2 className="text-xl font-semibold pb-4 border-b">
                            Page Settings
                        </h2>
                        <WikiUpdatePageForm
                            projectSlug={project.slug}
                            wikiId={wiki.id}
                            page={page}
                            redirectUrl={`/dashboard/projects/${project.slug}/wiki/pages/${page.slug}/settings`}
                        />
                    </Card>
                    <Card className="p-6 h-max grid gap-4 border-destructive">
                        <h2 className="text-xl font-semibold pb-4 border-b border-destructive">
                            Danger Zone
                        </h2>
                        {page.status === "Published" && (
                            <div className="flex flex-wrap gap-4 justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Archive Page
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Archive this page from the wiki. It will
                                        no longer be visible to users. This
                                        action is reversible.
                                    </p>
                                </div>
                                <div className="flex w-full sm:w-max">
                                    <WikiPageArchiveDialog
                                        page={page}
                                        project={project}
                                        wikiId={wiki.id}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Delete Page
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Permanently delete this wiki.
                                </p>
                            </div>
                            <div className="flex w-full sm:w-max">
                                <WikiDeletePageDialog
                                    page={page}
                                    project={project}
                                    wikiId={wiki.id}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
