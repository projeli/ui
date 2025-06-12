import { userApi } from "@/lib/api/user/user-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import {
    WikiCategory,
    WikiEvent,
    WikiEventType,
    WikiPage,
} from "@/lib/types/wiki-types";
import WikiEvents from "./wiki-events";

type WikiEventsContainerProps = {
    wikiId: string;
    eventTypes: WikiEventType[];
};

const WikiEventsContainer = async ({
    wikiId,
    eventTypes,
}: WikiEventsContainerProps) => {
    const {
        data: events,
        page,
        totalPages,
    } = await wikiApi.getEvents(wikiId, {
        page: 1,
        eventTypes: eventTypes,
    });
    const hasMoreEvents = page < totalPages;
    const userIds = events ? getUserIds(events) : [];
    const users = userIds.length > 0 ? await userApi.getByIds(userIds) : [];

    const pages: Record<string, WikiPage> = (
        await wikiPageApi.getByWikiId(wikiId)
    ).reduce((acc: Record<string, WikiPage>, page) => {
        acc[page.id] = page;
        return acc;
    }, {});

    const categories: Record<string, WikiCategory> = (
        await wikiCategoryApi.getByWikiId(wikiId)
    ).reduce((acc: Record<string, WikiCategory>, category) => {
        acc[category.id] = category;
        return acc;
    }, {});

    return (
        <WikiEvents
            initialEvents={events}
            initialUsers={users}
            pages={pages}
            categories={categories}
            hasMoreEvents={hasMoreEvents}
            wikiId={wikiId}
            types={eventTypes}
        />
    );
};

const getUserIds = (events: WikiEvent[]) => {
    const userIds = new Set<string>();
    events.forEach((event) => {
        if (event.userId) {
            userIds.add(event.userId);
        }

        if (event.$type === "WikiMemberAddedEvent") {
            userIds.add(event.memberId);
        } else if (event.$type === "WikiMemberRemovedEvent") {
            userIds.add(event.memberId);
        } else if (event.$type === "WikiMemberUpdatedPermissionsEvent") {
            userIds.add(event.memberId);
        } else if (event.$type === "WikiUpdatedOwnershipEvent") {
            userIds.add(event.toUserId);
        }
    });
    return Array.from(userIds);
};

export default WikiEventsContainer;
