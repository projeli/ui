import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardProjectNavigation from "@/components/dashboard/project/dashboard-project-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboardProject,
} from "@/components/notification/breadcrumbs";
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
                links={withDashboardProject(project, [
                    { label: "Edit Project" },
                ])}
            />
            <DashboardGrid>
                <div className="grid gap-6 h-max">
                    <DashboardProjectNavigation project={project} />
                </div>
                <div className="grid gap-6 h-max">
                    <Card className="h-max p-6">
                        <h2 className="text-xl font-semibold">
                            Project Details
                        </h2>
                        <p className="text-muted-foreground">
                            Update your project details here.
                        </p>
                        <ProjectUpdateDetailsForm project={project} />
                    </Card>
                    <Card className="h-max p-6">
                        <h2 className="text-xl font-semibold">Danger Zone</h2>
                        <p className="text-muted-foreground">
                            Be careful! This action is irreversible.
                        </p>
                        <div className="mt-4">
                            <Button variant="destructive">
                                Delete Project
                            </Button>
                        </div>
                    </Card>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
