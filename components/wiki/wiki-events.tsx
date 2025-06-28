"use client";

import { getMoreWikiEventsAction } from "@/actions/wiki/get-more-wiki-events";
import { PagedApiResponse } from "@/lib/types/api-response-types";
import { ProjeliUser } from "@/lib/types/user-types";
import {
    EventGroupCategory,
    WikiEvent as TWikiEvent,
    WikiCategory,
    WikiCategoryEvent,
    WikiEventType,
    WikiMemberEvent,
    WikiPage,
    WikiPageEvent,
} from "@/lib/types/wiki-types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import WikiEventDialog from "./wiki-event-dialog";

type WikiEventsTableProps = {
    initialEvents: TWikiEvent[];
    initialUsers: ProjeliUser[];
    pages: Record<string, WikiPage>;
    categories: Record<string, WikiCategory>;
    hasMoreEvents: boolean;
    wikiId: string;
    types: WikiEventType[];
};

const WikiEvents = ({
    initialEvents,
    initialUsers,
    pages,
    categories,
    hasMoreEvents,
    wikiId,
    types,
}: WikiEventsTableProps) => {
    const [events, setEvents] = useState<TWikiEvent[]>(initialEvents);
    const [users, setUsers] = useState<ProjeliUser[]>(initialUsers);
    const [hasMore, setHasMore] = useState(hasMoreEvents);

    const [formState, formAction, isLoading] = useActionState(
        getMoreWikiEventsAction,
        {
            events: {
                data: events,
                page: 1,
            } as PagedApiResponse<TWikiEvent>,
            users: initialUsers,
        }
    );

    if (!events) return null;

    const groupedEvents = groupConsecutiveWikiEvents(events);

    const handleSubmit = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("wikiId", wikiId);
            formData.append("page", String(formState.events.page + 1));
            users.forEach((user) => {
                formData.append("userIds", user.userId);
            });
            types.forEach((type) => {
                formData.append("eventTypes", type);
            });
            formAction(formData);
        });
    };

    useEffect(() => {
        if (formState.events.page > 1) {
            if (formState.events.data) {
                setEvents((prevEvents) => [
                    ...prevEvents,
                    ...formState.events.data,
                ]);
            }
            if (formState.users.length > 0) {
                setUsers((prevUsers) => [...prevUsers, ...formState.users]);
            }
            setHasMore(formState.events.page < formState.events.totalPages);
        }
    }, [formState]);

    useEffect(() => {
        if (initialEvents) {
            setEvents(initialEvents);
        }
    }, [initialEvents]);

    return (
        <div className="grid gap-4 w-full">
            {groupedEvents?.map((group, i) => {
                const { category, parentId, events: groupEvents } = group;
                return (
                    <WikiEventGroup
                        key={i}
                        category={category}
                        parentId={parentId}
                        groupEvents={groupEvents}
                        users={users}
                        pages={pages}
                        categories={categories}
                    />
                );
            })}
            {hasMore && (
                <Button
                    loading={isLoading}
                    variant="outline"
                    className="w-full"
                    onClick={handleSubmit}
                >
                    Load more activities
                </Button>
            )}
        </div>
    );
};

const WikiEventGroup = ({
    category,
    parentId,
    groupEvents,
    users,
    pages,
    categories,
}: {
    category: EventGroupCategory;
    parentId?: string;
    groupEvents: TWikiEvent[];
    users: ProjeliUser[];
    pages: Record<string, WikiPage>;
    categories: Record<string, WikiCategory>;
}) => {
    return (
        <div className="grid rounded-md bg-accent p-4 border">
            <h2 className="font-semibold text-foreground">
                {category === "wiki" && "Wiki"}
                {category === "wikiPage" &&
                    `Page: ${pages[parentId!]?.title || "Deleted page"}`}
                {category === "wikiMember" &&
                    `Member: ${
                        users.find((u) => u.userId === parentId!)?.userName ||
                        "Deleted user"
                    }`}
                {category === "wikiCategory" &&
                    `Category: ${
                        categories[parentId!]?.name || "Deleted category"
                    }`}
            </h2>
            {groupEvents.map((event, i) => {
                const user = users.find((u) => u.userId === event.userId);
                return (
                    <div key={i}>
                        {i !== 0 && (
                            <div className="border-b border-border my-1" />
                        )}
                        <WikiEventDialog
                            event={event}
                            user={user}
                            users={users}
                            pages={pages}
                            categories={categories}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export const WikiEvent = ({
    event,
    users,
    pages,
    categories,
}: {
    event: TWikiEvent;
    users: ProjeliUser[];
    pages: Record<string, WikiPage>;
    categories: Record<string, WikiCategory>;
}) => {
    return event.$type === "WikiCreatedEvent" ? (
        <p className="text-sm text-muted-foreground">Created the wiki.</p>
    ) : event.$type === "WikiUpdatedContentEvent" ? (
        <p className="text-sm text-muted-foreground">
            Changed the wiki description.
        </p>
    ) : event.$type === "WikiUpdatedOwnershipEvent" ? (
        <p className="text-sm text-muted-foreground">
            Transferred to ownership to{" "}
            <span className="text-foreground">
                @
                {users.find((u) => u.userId === event.toUserId)?.userName ||
                    "Deleted user"}
            </span>
        </p>
    ) : event.$type === "WikiUpdatedSidebarEvent" ? (
        <p className="text-sm text-muted-foreground">
            Updated the wiki sidebar.
        </p>
    ) : event.$type === "WikiUpdatedStatusEvent" ? (
        <p className="text-sm text-muted-foreground">
            Changed the wiki status to{" "}
            <span className="text-foreground">{event.status}</span>.
        </p>
    ) : event.$type === "WikiPageCreatedEvent" ? (
        <p className="text-sm text-muted-foreground">
            Created the wiki page{" "}
            <span className="text-foreground">
                {event?.title || "Deleted page"}
            </span>
        </p>
    ) : event.$type === "WikiPageDeletedEvent" ? (
        <p className="text-sm text-muted-foreground">
            Deleted the wiki page{" "}
            <span className="text-foreground">
                {pages[event.wikiPageId]?.title || "Deleted page"}
            </span>
        </p>
    ) : event.$type === "WikiPageUpdatedCategoriesEvent" ? (
        event.categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
                Removed all categories from the wiki page{" "}
                <span className="text-foreground">
                    {pages[event.wikiPageId]?.title || "Deleted page"}
                </span>
            </p>
        ) : event.categories.length === 1 ? (
            <p className="text-sm text-muted-foreground">
                Updated the category of the wiki page{" "}
                <span className="text-foreground">
                    {pages[event.wikiPageId]?.title || "Deleted page"}
                </span>{" "}
                to [
                <span className="text-foreground">
                    {categories[event.categories[0].id]?.name || "Deleted category"}
                </span>
                ]
            </p>
        ) : (
            <p className="text-sm text-muted-foreground">
                Updated the categories of the wiki page{" "}
                <span className="text-foreground">
                    {pages[event.wikiPageId]?.title || "Deleted page"}
                </span>{" "}
                to [
                <span className="text-foreground">
                    {event.categories
                        .map((c) => categories[c.id]?.name || "Deleted category")
                        .slice(0, -1)
                        .join(", ")}
                    , and{" "}
                    {
                        categories[
                            event.categories[event.categories.length - 1].id
                        ]?.name || "Deleted category"
                    }
                </span>
                ]
            </p>
        )
    ) : event.$type === "WikiPageUpdatedContentEvent" ? (
        <p className="text-sm text-muted-foreground">
            Updated the content of the wiki page{" "}
            <span className="text-foreground">
                {pages[event.wikiPageId]?.title || "Deleted page"}
            </span>
        </p>
    ) : event.$type === "WikiPageUpdatedDetailsEvent" ? (
        <p className="text-sm text-muted-foreground">
            Updated the details of the wiki page{" "}
            <span className="text-foreground">
                {pages[event.wikiPageId]?.title || "Deleted page"}
            </span>
        </p>
    ) : event.$type === "WikiPageUpdatedStatusEvent" ? (
        <p className="text-sm text-muted-foreground">
            Updated the status of the wiki page{" "}
            <span className="text-foreground">
                {pages[event.wikiPageId]?.title || "Deleted page"}
            </span>{" "}
            to <span className="text-foreground">{event.status}</span>.
        </p>
    ) : event.$type === "WikiCategoryCreatedEvent" ? (
        <p className="text-sm text-muted-foreground">
            Created the category{" "}
            <span className="text-foreground">
                {categories[event.categoryId]?.name || "Deleted category"}
            </span>
        </p>
    ) : event.$type === "WikiCategoryDeletedEvent" ? (
        <p className="text-sm text-muted-foreground">
            Deleted the category{" "}
            <span className="text-foreground">
                {categories[event.categoryId]?.name || "Deleted category"}
            </span>
        </p>
    ) : event.$type === "WikiCategoryUpdatedEvent" ? (
        <p className="text-sm text-muted-foreground">
            Updated the details of the category{" "}
            <span className="text-foreground">
                {categories[event.categoryId]?.name || "Deleted category"}
            </span>
        </p>
    ) : event.$type === "WikiCategoryUpdatedPagesEvent" ? (
        event.pages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
                Removed all pages from the wiki category{" "}
                <span className="text-foreground">
                    {pages[event.categoryId]?.title || "Deleted category"}
                </span>
            </p>
        ) : event.pages.length === 1 ? (
            <p className="text-sm text-muted-foreground">
                Updated the page of the wiki category{" "}
                <span className="text-foreground">
                    {categories[event.categoryId]?.name || "Deleted category"}
                </span>{" "}
                to [
                <span className="text-foreground">
                    {pages[event.pages[0].id]?.title || "Deleted page"}
                </span>
                ]
            </p>
        ) : (
            <p className="text-sm text-muted-foreground">
                Updated the pages of the wiki category{" "}
                <span className="text-foreground">
                    {categories[event.categoryId]?.name || "Deleted category"}
                </span>{" "}
                to [
                <span className="text-foreground">
                    {event.pages
                        .map((c) => pages[c.id]?.title || "Deleted page")
                        .slice(0, -1)
                        .join(", ")}
                    , and{" "}
                    {
                        pages[
                            event.pages[event.pages.length - 1].id
                        ]?.title || "Deleted page"
                    }
                </span>
                ]
            </p>
        )
    ) : event.$type === "WikiMemberAddedEvent" ? (
        <p className="text-sm text-muted-foreground">
            Added{" "}
            <span className="text-foreground">
                @
                {users.find((u) => u.userId === event.memberId)?.userName ||
                    "Deleted user"}
            </span>{" "}
            to the wiki.
        </p>
    ) : event.$type === "WikiMemberRemovedEvent" ? (
        <p className="text-sm text-muted-foreground">
            Removed{" "}
            <span className="text-foreground">
                @
                {users.find((u) => u.userId === event.memberId)?.userName ||
                    "Deleted user"}
            </span>{" "}
            from the wiki.
        </p>
    ) : event.$type === "WikiMemberUpdatedPermissionsEvent" ? (
        <p className="text-sm text-muted-foreground">
            Updated the permissions of{" "}
            <span className="text-foreground">
                @
                {users.find((u) => u.userId === event.memberId)?.userName ||
                    "Deleted user"}
            </span>
        </p>
    ) : null;
};

const getEventCategory = (event: TWikiEvent) => {
    const type = event.$type;
    if (type.startsWith("WikiPage")) return "wikiPage";
    else if (type.startsWith("WikiMember")) return "wikiMember";
    else if (type.startsWith("WikiCategory")) return "wikiCategory";
    else return "wiki";
};

const groupConsecutiveWikiEvents = (events: TWikiEvent[]): EventGroup[] => {
    const groups: EventGroup[] = [];
    let currentCategory: EventGroupCategory | null = null;
    let currentParentId: string | null = null;
    let currentGroup: TWikiEvent[] = [];

    // Iterate through each event in the sequence
    for (const event of events) {
        const category = getEventCategory(event);
        const parentId = getParentId(event, category);

        // If both category and parentId match the current ones, add to the current group
        if (category === currentCategory && parentId === currentParentId) {
            currentGroup.push(event);
        } else {
            // If there's an existing group, add it to the result
            if (currentGroup.length > 0) {
                groups.push({
                    category: currentCategory!,
                    parentId: currentParentId || undefined,
                    events: currentGroup,
                });
            }
            // Start a new group with the current event
            currentGroup = [event];
            currentCategory = category;
            currentParentId = parentId;
        }
    }

    // Add the last group if it exists
    if (currentGroup.length > 0) {
        groups.push({
            category: currentCategory!,
            parentId: currentParentId || undefined,
            events: currentGroup,
        });
    }

    return groups;
};

const getParentId = (
    event: TWikiEvent,
    category: EventGroupCategory
): string | null => {
    switch (category) {
        case "wikiPage":
            return (event as WikiPageEvent<string>).wikiPageId;
        case "wikiCategory":
            return (event as WikiCategoryEvent<string>).categoryId;
        case "wikiMember":
            return (event as WikiMemberEvent<string>).memberId;
        case "wiki":
        default:
            return null; // Wiki-level events don't have a parent ID
    }
};

type EventGroup = {
    category: EventGroupCategory;
    parentId?: string; // Optional parent ID (e.g., wikiPageId, categoryId, memberId)
    events: TWikiEvent[];
};

export default WikiEvents;
