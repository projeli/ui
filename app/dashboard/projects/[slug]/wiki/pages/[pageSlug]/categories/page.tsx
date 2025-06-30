import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiPageHeader from "@/components/dashboard/wiki/page/dashboard-wiki-page-header";
import DashboardWikiPageNavigation from "@/components/dashboard/wiki/page/dashboard-wiki-page-navigation";
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
import { getProjectMember, getWikiMember } from "@/lib/utils";
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

    const [project, wiki, page, categories] = await Promise.all([
        projectApi.getBySlug(slug),
        wikiApi.getByProjectSlug(slug),
        wikiPageApi.getByProjectSlugAndSlug(slug, pageSlug),
        wikiCategoryApi.getByProjectSlug(slug),
    ]);

    if (!project) return notFound();
    if (!wiki) return notFound();
    if (!page) return notFound();

    const projectMember = getProjectMember(userId, project);
    const wikiMember = getWikiMember(userId, wiki);

    if (!wikiMember || !projectMember) return forbidden();

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
                <div className="flex flex-col gap-4 h-max">
                    <DashboardWikiPageHeader
                        page={page}
                        wiki={wiki}
                        wikiMember={wikiMember}
                    />
                    <WikiPageCategoriesForm
                        wikiId={wiki.id}
                        page={page}
                        categories={categories}
                        member={wikiMember}
                    />
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
