import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import DashboardWikiPageHeader from "@/components/dashboard/wiki/page/dashboard-wiki-page-header";
import DashboardWikiPageNavbar from "@/components/dashboard/wiki/page/dashboard-wiki-page-navbar";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWikiPages,
} from "@/components/navigation/breadcrumbs";
import WikiPageCategoriesForm from "@/components/wiki/wiki-page-categories-form";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
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

    const [project, wiki, page, categories] = await Promise.all([
        projectApi.getBySlug(slug),
        wikiApi.getByProjectSlug(slug),
        wikiPageApi.getByProjectSlugAndSlug(slug, pageSlug),
        wikiCategoryApi.getByProjectSlug(slug),
    ]);

    if (!project) return notFound();
    if (!wiki) return notFound();
    if (!page) return notFound();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWikiPages(project, [{ label: page.title }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation project={project} wiki={wiki} />
                </div>
                <div className="flex flex-col gap-4 h-max">
                    <DashboardWikiPageHeader
                        project={project}
                        page={page}
                        wikiId={wiki.id}
                    />
                    <DashboardWikiPageNavbar
                        projectSlug={project.slug}
                        pageSlug={page.slug}
                    />
                    <WikiPageCategoriesForm
                        wikiId={wiki.id}
                        page={page}
                        categories={categories}
                    />
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
