"use client";

import { getNotifications } from "@/actions/notification/get-notifications";
import { useToast } from "@/hooks/use-toast";
import { Notification } from "@/lib/types/notification-types";
import { Project } from "@/lib/types/project-types";
import { ProjeliUser } from "@/lib/types/user-types";
import { Wiki } from "@/lib/types/wiki-types";
import { Bell, Boxes, RefreshCcw } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import Anchor from "../navigation/anchor";
import NotificationCard from "../notification/notification-card";
import NotificationMarkAllButton from "../notification/notification-mark-all-button";
import ProjectCard from "../project/project-card";
import ProjectCreateDialog from "../project/project-create-dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import DashboardCard from "./dashboard-card";
import DashboardGrid from "./dashboard-grid";
import DashboardNavigation from "./dashboard-navigation";

type DashboardPageProps = {
    userProjects: Project[];
    projectsCount: number;
    notifications: Notification[];
    notificationsCount: number;
    unreadNotificationsCount: number;
    performers: ProjeliUser[];
    projects: Project[];
    wikis: Wiki[];
};

const DashboardPage = ({
    userProjects,
    projectsCount,
    notifications: initialNotifications,
    notificationsCount,
    unreadNotificationsCount,
    performers,
    projects,
    wikis,
}: DashboardPageProps) => {
    const [notifications, setNotifications] =
        useState<Notification[]>(initialNotifications);
    const [unreadCount, setUnreadCount] = useState(unreadNotificationsCount);
    const { toast } = useToast();

    const [formState, formAction, isLoading] = useActionState(
        getNotifications,
        {
            data: [],
            message: "",
            success: false,
        }
    );

    const refreshNotifications = () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("unread", "true");
            formData.append("pageSize", "5");
            formData.append("page", "1");
            formAction(formData);
        });
    };

    useEffect(() => {
        if (formState.success && formState.data) {
            setNotifications(formState.data);
            setUnreadCount(formState.data.length);
        } else if (!formState.success && formState.message) {
            toast({
                description: "Failed to fetch notifications.",
                variant: "destructive",
            });
        }
    }, [formState]);

    return (
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
                        count={unreadCount}
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
                                {userProjects.map((project) => (
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
                                Your most recent notifications are listed below.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                loading={isLoading}
                                size="icon"
                                variant="outline"
                                onClick={refreshNotifications}
                                icon={<RefreshCcw />}
                            />
                            <Anchor href="/dashboard/notifications">
                                <Bell />
                                View all notifications
                            </Anchor>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        {notificationsCount === 0 ? (
                            <Card className="p-6">
                                <p className="text-center text-muted-foreground">
                                    You are all caught up! There are no new
                                    notifications.
                                </p>
                            </Card>
                        ) : (
                            notifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    performer={performers.find(
                                        (performer) =>
                                            performer.userId ===
                                            (notification.body as any)
                                                .performerId
                                    )}
                                    project={projects.find(
                                        (project) =>
                                            project.id ===
                                            (notification.body as any).projectId
                                    )}
                                    wiki={wikis.find(
                                        (wiki) =>
                                            wiki.id ===
                                            (notification.body as any).wikiId
                                    )}
                                    setUnreadCount={setUnreadCount}
                                />
                            ))
                        )}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <NotificationMarkAllButton
                            unreadCount={unreadCount}
                            redirectUrl="/dashboard"
                        />
                    </div>
                </div>
            </div>
        </DashboardGrid>
    );
};

export default DashboardPage;
