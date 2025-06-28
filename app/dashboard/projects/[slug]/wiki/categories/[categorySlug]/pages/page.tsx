import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiCategoryHeader from "@/components/dashboard/wiki/category/dashboard-wiki-category-header";
import DashboardWikiCategoryNavigation from "@/components/dashboard/wiki/category/dashboard-wiki-category-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWikiCategories,
} from "@/components/navigation/breadcrumbs";
import WikiCategoryPagesForm from "@/components/wiki/wiki-category-pages-form";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
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
        categorySlug: string;
    }>;
}) {
    const { slug, categorySlug } = await params;

    const { userId } = await auth();
    if (!userId) return unauthorized();

    const [project, wiki, category, pages] = await Promise.all([
        projectApi.getBySlug(slug),
        wikiApi.getByProjectSlug(slug),
        wikiCategoryApi.getByProjectSlugAndSlug(slug, categorySlug),
        wikiPageApi.getByProjectSlug(slug),
    ]);

    if (!project) return notFound();
    if (!wiki) return notFound();
    if (!category) return notFound();

    const projectMember = getProjectMember(userId, project);
    const wikiMember = getWikiMember(userId, wiki);

    if (!wikiMember || !projectMember) return forbidden();

    const canUpdate = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.EditWikiCategories
    );
    const canDelete = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.DeleteWikiCategories
    );

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWikiCategories(project, [
                    { label: category.name },
                ])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiCategoryNavigation
                        project={project}
                        wiki={wiki}
                        category={category}
                        projectMember={projectMember}
                        wikiMember={wikiMember}
                    />
                </div>
                <div className="flex flex-col gap-4 h-full">
                    <DashboardWikiCategoryHeader
                        project={project}
                        category={category}
                    />
                    <WikiCategoryPagesForm
                        wikiId={wiki.id}
                        category={category}
                        pages={pages}
                        member={wikiMember}
                    />
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
