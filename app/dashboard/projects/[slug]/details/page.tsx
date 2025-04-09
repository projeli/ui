import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/notification/breadcrumbs";
import ProjectArchiveDialog from "@/components/project/project-archive-dialog";
import ProjectDeleteDialog from "@/components/project/project-delete-dialog";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import ProjectUpdateDetailsForm from "@/components/project/project-update-details-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
                links={withDashboardProject(project, [{ label: "Details" }])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardProjectNavigation project={project} />
                </div>
                <div className="grid gap-4 h-max">
                    <ProjectInfoBanner project={project} />
                    <Card className="h-max p-6">
                        <h2 className="text-xl font-semibold">
                            Project Details
                        </h2>
                        <p className="text-muted-foreground">
                            Update your project details here.
                        </p>
                        <ProjectUpdateDetailsForm project={project} />
                    </Card>
                    <Card className="p-6 h-max grid gap-4 border-destructive">
                        <h2 className="text-xl font-semibold pb-4 border-b border-destructive">
                            Danger Zone
                        </h2>
                        {project.status === "Published" && (
                            <div className="flex flex-wrap gap-4 justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Archive Project
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Archive this wiki to remove it from the
                                        public view.
                                    </p>
                                </div>
                                <div className="flex w-full sm:w-max">
                                    <ProjectArchiveDialog
                                        project={project}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Delete Project
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Permanently delete this project and its wikis.
                                </p>
                            </div>
                            <div className="flex w-full sm:w-max">
                                <ProjectDeleteDialog
                                    project={project}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
