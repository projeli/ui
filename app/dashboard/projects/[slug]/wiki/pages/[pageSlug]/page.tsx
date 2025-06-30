import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiPageHeader from "@/components/dashboard/wiki/page/dashboard-wiki-page-header";
import DashboardWikiPageNavigation from "@/components/dashboard/wiki/page/dashboard-wiki-page-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWikiPages,
} from "@/components/navigation/breadcrumbs";
import { Card } from "@/components/ui/card";
import WikiDeletePageDialog from "@/components/wiki/wiki-delete-page-dialog";
import WikiPageArchiveDialog from "@/components/wiki/wiki-page-archive-dialog";
import WikiUpdatePageForm from "@/components/wiki/wiki-update-page-form";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import { WikiMemberPermissions } from "@/lib/types/wiki-types";
import {
    getProjectMember,
    getWikiMember,
    hasWikiPermission,
} from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { forbidden, notFound, unauthorized } from "next/navigation";

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
    if (!wiki) return notFound();
    if (!page) return notFound();

    const projectMember = getProjectMember(userId, project);
    const wikiMember = getWikiMember(userId, wiki);

    if (!wikiMember || !projectMember) return forbidden();

    const canUpdate = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.EditWikiPages
    );
    const canArchive = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.ArchiveWikiPages
    );
    const canDelete = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.DeleteWikiPages
    );

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWikiPages(project, [{ label: page.title }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiPageNavigation
                        project={project}
                        wiki={wiki}
                        page={page}
                        projectMember={projectMember}
                        wikiMember={wikiMember}
                    />
                </div>
                <div className="flex flex-col gap-4 h-full">
                    <DashboardWikiPageHeader
                        page={page}
                        wiki={wiki}
                        wikiMember={wikiMember}
                    />
                    {canUpdate && (
                        <Card className="p-6 h-max">
                            <h2 className="text-xl font-semibold pb-4 border-b">
                                Details
                            </h2>
                            <WikiUpdatePageForm
                                projectSlug={project.slug}
                                wikiId={wiki.id}
                                page={page}
                                redirectUrl={`/dashboard/projects/${project.slug}/wiki/pages/${page.slug}`}
                            />
                        </Card>
                    )}
                    {(canDelete ||
                        (canArchive && page.status === "Published")) && (
                        <Card className="p-6 h-max grid gap-4 border-destructive">
                            <h2 className="text-xl font-semibold pb-4 border-b border-destructive">
                                Danger Zone
                            </h2>
                            {canArchive && page.status === "Published" && (
                                <div className="flex flex-wrap gap-4 justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Archive Page
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Archive this page from the wiki. It
                                            will no longer be visible to users.
                                            This action is reversible.
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
                            {canDelete && (
                                <div className="flex flex-wrap gap-4 justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Delete Page
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Permanently delete this page.
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
                            )}
                        </Card>
                    )}
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
