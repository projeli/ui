import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import DashboardWikiSettingsNavbar from "@/components/dashboard/wiki/dashboard-wiki-settings-navbar";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWiki,
} from "@/components/navigation/breadcrumbs";
import { Card } from "@/components/ui/card";
import WikiArchiveDialog from "@/components/wiki/wiki-archive-dialog";
import WikiDeleteDialog from "@/components/wiki/wiki-delete-dialog";
import WikiInfoBanner from "@/components/wiki/wiki-info-banner";
import WikiUpdateSidebarForm from "@/components/wiki/wiki-update-sidebar-form";
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
    if (!wiki) return notFound();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWiki(project, [{ label: "Settings" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation project={project} wiki={wiki} />
                </div>
                <div className="flex flex-col gap-4">
                    <WikiInfoBanner wiki={wiki} project={project} />
                    <DashboardWikiSettingsNavbar projectSlug={project.slug} />
                    <Card className="p-6 h-max grid gap-4">
                        <h2 className="text-xl font-semibold pb-4 border-b">
                            Wiki Settings
                        </h2>
                        <div className="grid gap-4">
                            <WikiUpdateSidebarForm wiki={wiki} pages={pages} />
                        </div>
                    </Card>
                    <Card className="p-6 h-max grid gap-4 border-destructive">
                        <h2 className="text-xl font-semibold pb-4 border-b border-destructive">
                            Danger Zone
                        </h2>
                        {wiki.status === "Published" && (
                            <div className="flex flex-wrap gap-4 justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Archive Wiki
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Archive this wiki to remove it from the
                                        public view.
                                    </p>
                                </div>
                                <div className="flex w-full sm:w-max">
                                    <WikiArchiveDialog
                                        project={project}
                                        wiki={wiki}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Delete Wiki
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Permanently delete this wiki.
                                </p>
                            </div>
                            <div className="flex w-full sm:w-max">
                                <WikiDeleteDialog
                                    project={project}
                                    wiki={wiki}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
