import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardNavigation from "@/components/dashboard/dashboard-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboard,
} from "@/components/navigation/breadcrumbs";
import NotificationCard from "@/components/notification/notification-card";
import NotificationMarkAllButton from "@/components/notification/notification-mark-all-button";
import NotificationsTable from "@/components/notification/notifications-table";
import { ProjectPageSizeSelect } from "@/components/project/project-page-size-select";
import { Card } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import SearchparamsSelect from "@/components/ui/searchparams-select";
import { notificationApi } from "@/lib/api/notification/notification-api";
import { projectApi } from "@/lib/api/project/project-api";
import { userApi } from "@/lib/api/user/user-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import {
    Notification,
    notificationTypes,
} from "@/lib/types/notification-types";
import { auth } from "@clerk/nextjs/server";
import _ from "lodash";
import { unauthorized } from "next/navigation";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        type?: string;
        pageSize?: string;
        page?: string;
    }>;
}) {
    const params = await searchParams;
    const type = params?.type;
    const pageSize = params?.pageSize || "25";
    const page = params?.page || "1";

    const { userId } = await auth();
    if (!userId) {
        return unauthorized();
    }

    const notificationsResponse = await notificationApi.get({
        type: type === "All" ? undefined : type,
        page,
        pageSize,
    });
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

    const [performers, projects, wikis, unreadCountResponse] =
        await Promise.all([
            performerIds.length > 0 ? userApi.getByIds(performerIds) : [],
            projectIds.length > 0 ? projectApi.getByIds(projectIds) : [],
            wikiIds.length > 0 ? wikiApi.getByIds(wikiIds) : [],
            notificationApi.getUnread(),
        ]);

    const unreadCount = unreadCountResponse?.data ?? 0;

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs links={withDashboard([{ label: "Notifications" }])} />
            <DashboardGrid>
                <div className="row-start-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 h-max">
                    <Card className="p-6">
                        <DashboardNavigation />
                    </Card>
                </div>
                <NotificationsTable
                    notificationsResponse={notificationsResponse}
                    performers={performers}
                    projects={projects}
                    wikis={wikis}
                    unreadCount={unreadCount}
                    type={type}
                    pageSize={pageSize}
                />
            </DashboardGrid>
        </PageContainer>
    );
}
