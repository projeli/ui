import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWiki,
} from "@/components/notification/breadcrumbs";
import { Card } from "@/components/ui/card";
import { WikiCategoriesTable } from "@/components/wiki/wiki-categories-table";
import WikiCreateCategoryDialog from "@/components/wiki/wiki-create-category-dialog";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
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

    const wiki = await wikiApi.getByProjectId(project.id);

    if (!wiki || !["Published", "Draft"].includes(wiki.status))
        return notFound();

    const categories = await wikiCategoryApi.getByWikiId(wiki.id);

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWiki(project, [{ label: "Categories" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation project={project} wiki={wiki} />
                </div>
                <div className="grid gap-6">
                    <Card className="p-6 h-max">
                        <div className="flex justify-between items-end gap-4 pb-4 border-b">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Categories
                                </h2>
                                <p className="text-sm opacity-80 max-w-xl">
                                    Create and manage categories to organize
                                    your wiki pages. And make them easier to
                                    find and navigate.
                                </p>
                            </div>
                            <div>
                                <WikiCreateCategoryDialog
                                    projectSlug={project.slug}
                                    wikiId={wiki.id}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <WikiCategoriesTable
                                projectSlug={project.slug}
                                wikiId={wiki.id}
                                categories={categories}
                            />
                        </div>
                    </Card>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
