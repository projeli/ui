"use client";

import { PagedApiResponse } from "@/lib/types/api-response-types";
import {
    Notification,
    notificationTypes,
} from "@/lib/types/notification-types";
import { Project } from "@/lib/types/project-types";
import { ProjeliUser } from "@/lib/types/user-types";
import { Wiki } from "@/lib/types/wiki-types";
import _ from "lodash";
import { useState } from "react";
import { ProjectPageSizeSelect } from "../project/project-page-size-select";
import { Card } from "../ui/card";
import Pagination from "../ui/pagination";
import SearchparamsSelect from "../ui/searchparams-select";
import NotificationCard from "./notification-card";
import NotificationMarkAllButton from "./notification-mark-all-button";

type NotificationsTableProps = {
    notificationsResponse: PagedApiResponse<Notification>;
    performers: ProjeliUser[];
    projects: Project[];
    wikis: Wiki[];
    unreadCount: number;
    type?: string;
    pageSize: string;
};

const NotificationsTable = ({
    notificationsResponse,
    performers,
    projects,
    wikis,
    unreadCount: initialUnreadCount,
    type,
    pageSize,
}: NotificationsTableProps) => {
    const [unreadCount, setUnreadCount] = useState(initialUnreadCount);

    return (
        <div className="grid gap-6 h-full">
            <Card className="p-6 flex flex-wrap gap-4">
                <div className="flex-1">
                    <h2 className="text-sm font-semibold">
                        {unreadCount === 1
                            ? "You have 1 unread notification."
                            : `You have ${unreadCount} unread notifications.`}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Of {notificationsResponse.totalCount} in total.
                    </p>
                </div>
                <NotificationMarkAllButton unreadCount={unreadCount} />
                <span className="flex items-center whitespace-nowrap text-sm gap-2 grow sm:grow-0">
                    Type
                    <SearchparamsSelect
                        defaultValue={type || "All"}
                        options={[
                            {
                                value: "All",
                                label: "All",
                            },
                            ...notificationTypes.map((t) => {
                                return {
                                    value: t,
                                    label: _.startCase(t),
                                };
                            }),
                        ]}
                        name={"type"}
                        className="min-w-[150px]"
                    />
                </span>
                <span className="flex items-center whitespace-nowrap text-sm gap-2 grow sm:grow-0">
                    Per page
                    <ProjectPageSizeSelect pageSize={pageSize} />
                </span>
            </Card>
            {notificationsResponse.success ? (
                <div className="grid gap-4">
                    {notificationsResponse.data?.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            performer={performers.find(
                                (performer) =>
                                    performer.userId ===
                                    (notification.body as any).performerId
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
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center p-4 text-destructive">
                    <p>Failed to load notifications.</p>
                    <p>Please try again or contact support.</p>
                </div>
            )}
            {notificationsResponse.totalPages > 1 && (
                <Pagination
                    currentPage={notificationsResponse.page}
                    pageSize={notificationsResponse.pageSize}
                    totalItems={notificationsResponse.totalCount}
                    totalPages={notificationsResponse.totalPages}
                />
            )}
        </div>
    );
};

export default NotificationsTable;
