import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWikiDetails,
} from "@/components/navigation/breadcrumbs";
import WikiInfoBanner from "@/components/wiki/wiki-info-banner";
import WikiUpdateDescriptionForm from "@/components/wiki/wiki-update-description-form";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
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

    const projectMember = getProjectMember(userId, project);
    const wikiMember = getWikiMember(userId, wiki);

    if (
        !wikiMember ||
        !projectMember ||
        !hasWikiPermission(wikiMember, WikiMemberPermissions.EditWiki)
    )
        return forbidden();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWikiDetails(project, [
                    { label: "Description" },
                ])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation
                        project={project}
                        wiki={wiki}
                        projectMember={projectMember}
                        wikiMember={wikiMember}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <WikiInfoBanner
                        wiki={wiki}
                        wikiMember={wikiMember}
                    />
                    <WikiUpdateDescriptionForm project={project} wiki={wiki} />
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
