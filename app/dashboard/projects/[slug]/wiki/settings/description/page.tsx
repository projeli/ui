import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardWikiNavigation from "@/components/dashboard/wiki/dashboard-wiki-navigation";
import DashboardWikiSettingsNavbar from "@/components/dashboard/wiki/dashboard-wiki-settings-navbar";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardWikiSettings,
} from "@/components/notification/breadcrumbs";
import WikiUpdateDescriptionForm from "@/components/wiki/wiki-update-description-form";
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

    if (!wiki || !["Published", "Draft"].includes(wiki.status)) return notFound();

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardWikiSettings(project, [
                    { label: "Description" },
                ])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardWikiNavigation project={project} wiki={wiki} />
                </div>
                <div className="grid gap-6 h-full grid-rows-[max-content,1fr]">
                    <DashboardWikiSettingsNavbar projectSlug={project.slug} />
                    <WikiUpdateDescriptionForm project={project} wiki={wiki} />
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
