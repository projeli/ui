import {
    Notification,
    NotificationBody,
    ProjectDeletedBody,
    WikiDeletedBody,
    WikiPageDeletedBody,
} from "@/lib/types/notification-types";
import { Project } from "@/lib/types/project-types";
import { ProjeliUser } from "@/lib/types/user-types";
import { Wiki } from "@/lib/types/wiki-types";
import { getCdnUrl } from "@/lib/utils";
import { FileQuestion } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import NotificationMarkButton from "./notification-mark-button";

type NotificationCardProps = {
    notification: Notification;
    performer?: ProjeliUser;
    project?: Project;
    wiki?: Wiki;
    setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
};

const NotificationCard = ({
    notification,
    performer,
    project,
    wiki,
    setUnreadCount,
}: NotificationCardProps) => {
    return (
        <Card className="flex flex-wrap gap-4 p-4">
            <div className="flex gap-4 items-center">
                <NotificationMarkButton
                    notification={notification}
                    setUnreadCount={setUnreadCount}
                />
                <div>
                    <NotificationText
                        notification={notification}
                        performer={performer}
                        project={project}
                        wiki={wiki}
                    />
                </div>
            </div>
            <div className="flex gap-4 justify-end items-center grow">
                <div className="flex -space-x-3 *:ring-3 *:ring-background">
                    {performer && (
                        <Link href={`/users/${performer.userName}`}>
                            <Avatar className="size-8">
                                <AvatarFallback>
                                    <FileQuestion className="size-4" />
                                </AvatarFallback>
                                {performer.imageUrl && (
                                    <AvatarImage
                                        src={performer.imageUrl}
                                        alt={performer?.userName}
                                    />
                                )}
                            </Avatar>
                        </Link>
                    )}
                    {project && (
                        <Link href={`/projects/${project.slug}`}>
                            <Avatar className="size-8">
                                <AvatarFallback>
                                    <FileQuestion className="size-4" />
                                </AvatarFallback>
                                {project.imageUrl && (
                                    <AvatarImage
                                        src={getCdnUrl(project.imageUrl)}
                                        alt={project?.name}
                                    />
                                )}
                            </Avatar>
                        </Link>
                    )}
                    {wiki && (
                        <Link href={`/projects/${wiki.projectSlug}/wiki`}>
                            <Avatar className="size-8">
                                <AvatarFallback>
                                    <FileQuestion className="size-4" />
                                </AvatarFallback>
                                {wiki.projectImageUrl && (
                                    <AvatarImage
                                        src={getCdnUrl(wiki.projectImageUrl)}
                                        alt={wiki?.projectName}
                                    />
                                )}
                            </Avatar>
                        </Link>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    {moment(notification.timestamp).fromNow()}
                </p>
            </div>
        </Card>
    );
};

const renderers: {
    [K in NotificationBody["$type"]]: (
        props: NotificationTextProps
    ) => JSX.Element;
} = {
    ProjectPublished: ({ performer, project }) => (
        <p>
            <PerformerText userName={performer?.userName} /> published the
            project:{" "}
            {project ? (
                <Link
                    href={`/projects/${project?.slug}`}
                    className="underline font-semibold"
                >
                    {project?.name}
                </Link>
            ) : (
                <span className="font-semibold">Deleted project</span>
            )}
        </p>
    ),
    ProjectArchived: ({ performer, project }) => (
        <p>
            <PerformerText userName={performer?.userName} /> archived the
            project:{" "}
            {project ? (
                <Link
                    href={`/projects/${project?.slug}`}
                    className="underline font-semibold"
                >
                    {project?.name}
                </Link>
            ) : (
                <span className="font-semibold">Deleted project</span>
            )}
        </p>
    ),
    ProjectMemberAdded: ({ performer, project }) => (
        <p>
            <PerformerText userName={performer?.userName} /> added you to the
            project:{" "}
            {project ? (
                <Link
                    href={`/projects/${project?.slug}`}
                    className="underline font-semibold"
                >
                    {project?.name}
                </Link>
            ) : (
                <span className="font-semibold">Deleted project</span>
            )}
        </p>
    ),
    ProjectMemberRemoved: ({ project }) => (
        <p>
            You have been removed from the project:{" "}
            {project ? (
                <Link
                    href={`/projects/${project?.slug}`}
                    className="underline font-semibold"
                >
                    {project?.name}
                </Link>
            ) : (
                <span className="font-semibold">Deleted project</span>
            )}
        </p>
    ),
    ProjectDeleted: ({ performer, notification }) => (
        <p>
            <PerformerText userName={performer?.userName} /> deleted the
            project:{" "}
            <span className="font-semibold">
                {(notification.body as ProjectDeletedBody).projectName}
            </span>
        </p>
    ),
    WikiPublished: ({ performer, wiki }) => (
        <p>
            <PerformerText userName={performer?.userName} /> published the wiki:{" "}
            {wiki ? (
                <Link
                    href={`/projects/${wiki?.projectSlug}/wiki`}
                    className="underline font-semibold"
                >
                    {wiki?.projectName}
                </Link>
            ) : (
                <span className="font-semibold">Deleted wiki</span>
            )}
        </p>
    ),
    WikiArchived: ({ performer, wiki }) => (
        <p>
            <PerformerText userName={performer?.userName} /> archived the wiki:{" "}
            {wiki ? (
                <Link
                    href={`/projects/${wiki?.projectSlug}/wiki`}
                    className="underline font-semibold"
                >
                    {wiki?.projectName}
                </Link>
            ) : (
                <span className="font-semibold">Deleted wiki</span>
            )}
        </p>
    ),
    WikiPagePublished: ({ performer, wiki }) => (
        <p>
            <PerformerText userName={performer?.userName} /> published a page in
            wiki:{" "}
            {wiki ? (
                <Link
                    href={`/projects/${wiki?.projectSlug}/wiki`}
                    className="underline font-semibold"
                >
                    {wiki?.projectName}
                </Link>
            ) : (
                <span className="font-semibold">Deleted wiki</span>
            )}
        </p>
    ),
    WikiPageArchived: ({ performer, wiki }) => (
        <p>
            <PerformerText userName={performer?.userName} /> archived a page in
            wiki:{" "}
            {wiki ? (
                <Link
                    href={`/projects/${wiki?.projectSlug}/wiki`}
                    className="underline font-semibold"
                >
                    {wiki?.projectName}
                </Link>
            ) : (
                <span className="font-semibold">Deleted wiki</span>
            )}
        </p>
    ),
    WikiPageDeleted: ({ performer, notification, wiki }) => (
        <p>
            <PerformerText userName={performer?.userName} /> deleted the page:{" "}
            <span className="font-semibold">
                {(notification.body as WikiPageDeletedBody).pageName}
            </span>
            , in wiki:{" "}
            {wiki ? (
                <Link
                    href={`/projects/${wiki?.projectSlug}/wiki`}
                    className="underline font-semibold"
                >
                    {wiki?.projectName}
                </Link>
            ) : (
                <span className="font-semibold">Deleted wiki</span>
            )}
        </p>
    ),
    WikiDeleted: ({ performer, notification }) => (
        <p>
            @{performer?.userName} deleted the wiki:{" "}
            <span className="font-semibold">
                {(notification.body as WikiDeletedBody).wikiName}
            </span>
        </p>
    ),
};

type NotificationTextProps = {
    notification: Notification;
    performer?: ProjeliUser;
    project?: Project;
    wiki?: Wiki;
};

export const NotificationText = (props: NotificationTextProps) => {
    const type = props.notification.type;
    const renderer = renderers[type];

    return renderer ? renderer(props) : null;
};

export const PerformerText = ({ userName }: { userName?: string }) => {
    if (!userName) {
        return <span className="font-semibold">Deleted user</span>;
    }

    return (
        <Link className="underline font-semibold" href={`/users/${userName}`}>
            @{userName}
        </Link>
    );
};

export default NotificationCard;
