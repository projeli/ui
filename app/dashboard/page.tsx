import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardNavigation from "@/components/dashboard/dashboard-navigation";
import PageContainer from "@/components/layout/page-container";
import Anchor from "@/components/navigation/anchor";
import { Breadcrumbs, withHome } from "@/components/notification/breadcrumbs";
import ProjectCard from "@/components/project/project-card";
import ProjectCreateDialog from "@/components/project/project-create-dialog";
import { Card } from "@/components/ui/card";
import { projectApi } from "@/lib/api/project/project-api";
import { auth } from "@clerk/nextjs/server";
import { Bell, Boxes } from "lucide-react";
import { unauthorized } from "next/navigation";

export default async function Page() {
    const { userId } = await auth();

    if (!userId) {
        return unauthorized();
    }

    const projectsResponse = await projectApi.get({
        userId: userId,
        pageSize: "3",
        page: "1",
    });

    const projects = projectsResponse.data || [];
    const projectsCount = projectsResponse.totalCount || 0;

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs links={withHome([{ label: "Dashboard" }])} />
            <DashboardGrid>
                <div className="row-start-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 h-max">
                    <Card className="p-6">
                        <DashboardNavigation />
                    </Card>
                </div>
                <div className="grid gap-6">
                    <div
                        id="dashboard-cards"
                        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <DashboardCard
                            title="Projects"
                            description="View all projects"
                            count={projectsCount}
                            link="/dashboard/projects"
                        />
                        <DashboardCard
                            title="Unread notifications"
                            description="View all notifications"
                            count={0}
                            link="/dashboard/notifications"
                        />
                        <Card className="p-6">
                            <h2 className="font-medium text-muted-foreground">
                                Quick Actions
                            </h2>
                            <div className="grid mt-2 gap-2">
                                <ProjectCreateDialog
                                    variant="outline"
                                    buttonClass="justify-start"
                                />
                            </div>
                        </Card>
                    </div>
                    {projectsCount > 0 && (
                        <>
                            <hr />
                            <div id="dashboard-projects">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            Projects
                                        </h2>
                                        <p className="text-muted-foreground">
                                            Your most recent projects are listed
                                            below.
                                        </p>
                                    </div>
                                    <div>
                                        <Anchor href="/dashboard/projects">
                                            <Boxes />
                                            View all projects
                                        </Anchor>
                                    </div>
                                </div>
                                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                                    {projects.map((project) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            layout={"grid"}
                                            href={"/dashboard/projects"}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <hr />
                    <div id="dashboard-notifications">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Unread Notifications
                                </h2>
                                <p className="text-muted-foreground">
                                    Your most recent notifications are listed
                                    below.
                                </p>
                            </div>
                            <div>
                                <Anchor href="/dashboard/notifications">
                                    <Bell />
                                    View all notifications
                                </Anchor>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}

const DashboardCard = ({
    title,
    description,
    count,
    link,
}: {
    title: string;
    description: string;
    count: number;
    link: string;
}) => {
    return (
        <Card className="p-3">
            <div className="p-3 grid gap-4">
                <h2 className="font-medium text-muted-foreground">{title}</h2>
                <p className="text-4xl font-bold">{count}</p>
            </div>
            <div className="flex justify-end mt-1">
                <Anchor
                    variant="ghost"
                    href={link}
                    className="text-muted-foreground"
                >
                    {description}
                </Anchor>
            </div>
        </Card>
    );
};
