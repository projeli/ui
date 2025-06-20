import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/navigation/breadcrumbs";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import ProjectUpdateDescriptionForm from "@/components/project/project-update-content-form";
import { projectApi } from "@/lib/api/project/project-api";
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

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs
                links={withDashboardProject(project, [
                    { label: "Description" },
                ])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardProjectNavigation project={project} />
                </div>
                <div className="grid grid-rows-[max-content,1fr] gap-4">
                    <ProjectInfoBanner project={project} />
                    <ProjectUpdateDescriptionForm project={project} />
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
