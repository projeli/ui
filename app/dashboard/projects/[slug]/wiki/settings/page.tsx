import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import DashboardWikiSettingsNavbar from "@/components/dashboard/wiki/dashboard-wiki-settings-navbar";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWiki,
} from "@/components/notification/breadcrumbs";
import { Card } from "@/components/ui/card";
import WikiArchiveDialog from "@/components/wiki/wiki-archive-dialog";
import WikiDeleteDialog from "@/components/wiki/wiki-delete-dialog";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
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

    const wiki = await wikiApi.getByProjectId(project.id);

    if (!wiki || !["Published", "Draft"].includes(wiki.status))
        return notFound();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWiki(project, [{ label: "Settings" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation project={project} wiki={wiki} />
                </div>
                <div className="grid gap-6 h-max">
                    <DashboardWikiSettingsNavbar projectSlug={project.slug} />
                    <Card className="p-6 h-max grid gap-4">
                        <h2 className="text-xl font-semibold pb-4 border-b">
                            Settings
                        </h2>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Sidebar
                                    </h3>
                                    <p className="text-sm opacity-80">
                                        Customize the sidebar of this wiki.
                                    </p>
                                </div>
                                <div className="text-secondary font-black">
                                    Moet nog gemaakt worden.
                                </div>
                            </div>
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
                                    <p className="text-sm opacity-80">
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
                                <p className="text-sm opacity-80">
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
