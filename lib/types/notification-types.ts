export type Notification = {
    id: string;
    userId: string;
    type: NotificationType;
    body: NotificationBody;
    isRead: boolean;
    timestamp: string;
}

export type Body<NotificationType> = {
    $type: NotificationType;
}

export type ProjectBody<NotificationType> = Body<NotificationType> & {
    projectId: string;
}

export type ProjectPublishedBody = ProjectBody<"ProjectPublished"> & {
    performerId: string;
}

export type ProjectArchivedBody = ProjectBody<"ProjectArchived"> & {
    performerId: string;
}

export type ProjectMemberAddedBody = ProjectBody<"ProjectMemberAdded"> & {
    performerId: string;
}

export type ProjectMemberRemovedBody = ProjectBody<"ProjectMemberRemoved">

export type ProjectDeletedBody = ProjectBody<"ProjectDeleted"> & {
    projectName: string;
    performerId: string;
}

export type WikiBody<NotificationType> = Body<NotificationType> & {
    wikiId: string;
}

export type WikiPublishedBody = WikiBody<"WikiPublished"> & {
    performerId: string;
}

export type WikiArchivedBody = WikiBody<"WikiArchived"> & {
    performerId: string;
}

export type WikiPageBody<NotificationType> = WikiBody<NotificationType> & {
    pageId: string;
}

export type WikiPagePublishedBody = WikiPageBody<"WikiPagePublished"> & {
    performerId: string;
}

export type WikiPageArchivedBody = WikiPageBody<"WikiPageArchived"> & {
    performerId: string;
}

export type WikiPageDeletedBody = WikiPageBody<"WikiPageDeleted"> & {
    pageName: string;
    performerId: string;
}

export type WikiDeletedBody = WikiBody<"WikiDeleted"> & {
    wikiName: string;
    performerId: string;
}

export type NotificationBody =
    | ProjectPublishedBody
    | ProjectArchivedBody
    | ProjectMemberAddedBody
    | ProjectMemberRemovedBody
    | ProjectDeletedBody
    | WikiPublishedBody
    | WikiArchivedBody
    | WikiPagePublishedBody
    | WikiPageArchivedBody
    | WikiPageDeletedBody
    | WikiDeletedBody

export type NotificationType = "ProjectPublished"
    | "ProjectArchived"
    | "ProjectMemberAdded"
    | "ProjectMemberRemoved"
    | "ProjectDeleted"
    | "WikiPublished"
    | "WikiArchived"
    | "WikiPagePublished"
    | "WikiPageArchived"
    | "WikiPageDeleted"
    | "WikiDeleted"

export const notificationTypes: string[] = [
    "ProjectPublished",
    "ProjectArchived",
    "ProjectMemberAdded",
    "ProjectMemberRemoved",
    "ProjectDeleted",
    "WikiPublished",
    "WikiArchived",
    "WikiPagePublished",
    "WikiPageArchived",
    "WikiPageDeleted",
    "WikiDeleted",
]

export const notificationTypesWithPerformer = [
    "ProjectPublished",
    "ProjectArchived",
    "ProjectMemberAdded",
    "ProjectDeleted",
    "WikiPublished",
    "WikiArchived",
    "WikiPagePublished",
    "WikiPageArchived",
    "WikiPageDeleted",
    "WikiDeleted",
]

export type NotificationsSummary = {
    unreadCount: number;
}