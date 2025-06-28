import DashboardPage from "@/components/dashboard/dashboard-page";
import PageContainer from "@/components/layout/page-container";
import { Breadcrumbs, withHome } from "@/components/navigation/breadcrumbs";
import { notificationApi } from "@/lib/api/notification/notification-api";
import { projectApi } from "@/lib/api/project/project-api";
import { userApi } from "@/lib/api/user/user-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { Notification } from "@/lib/types/notification-types";
import { auth } from "@clerk/nextjs/server";
import { unauthorized } from "next/navigation";

export default async function Page() {
    const { userId } = await auth();

    if (!userId) {
        return unauthorized();
    }

    const [
        projectsResponse,
        notificationsResponse,
        unreadNotificationsCountResponse,
    ] = await Promise.all([
        projectApi.get({
            userId: userId,
            pageSize: "3",
            page: "1",
        }),
        notificationApi.get({
            unread: "true",
            pageSize: "5",
            page: "1",
        }),
        notificationApi.getUnread(),
    ]);
    const notifications = notificationsResponse.data || [];

    const getIds = (notifications: Notification[], key: string) => {
        return [
            ...new Set(
                notifications.map((n: any) => n.body?.[key]).filter((id) => id)
            ),
        ];
    };

    const performerIds = getIds(notifications, "performerId");
    const projectIds = getIds(notifications, "projectId");
    const wikiIds = getIds(notifications, "wikiId");

    const [performers, projects, wikis] = await Promise.all([
        performerIds.length > 0 ? userApi.getByIds(performerIds) : [],
        projectIds.length > 0 ? projectApi.getByIds(projectIds) : [],
        wikiIds.length > 0 ? wikiApi.getByIds(wikiIds) : [],
    ]);

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs links={withHome([{ label: "Dashboard" }])} />
            <DashboardPage
                userProjects={projectsResponse.data || []}
                projectsCount={projectsResponse.totalCount || 0}
                notifications={notificationsResponse.data || []}
                notificationsCount={notificationsResponse.totalCount || 0}
                unreadNotificationsCount={
                    unreadNotificationsCountResponse.data || 0
                }
                performers={performers}
                projects={projects}
                wikis={wikis}
            />
        </PageContainer>
    );
}
