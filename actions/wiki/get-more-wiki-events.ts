"use server";

import { userApi } from "@/lib/api/user/user-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { PagedApiResponse } from "@/lib/types/api-response-types";
import { CustomServerAction } from "@/lib/types/form-types";
import { ProjeliUser } from "@/lib/types/user-types";
import { WikiEvent, WikiEventType } from "@/lib/types/wiki-types";

export const getMoreWikiEventsAction: CustomServerAction<
    { events: PagedApiResponse<WikiEvent>, users: ProjeliUser[] }
> = async (
    currentState: { events: PagedApiResponse<WikiEvent>, users: ProjeliUser[] },
    formData: FormData
) => {
    const wikiId = formData.get("wikiId") as string;
    const page = Number(formData.get("page"));
    const userIds = formData.getAll("userIds") as string[];
    const eventTypes = formData.getAll("eventTypes") as WikiEventType[];

    const events = await wikiApi.getEvents(wikiId, { page, eventTypes });

    const newEventUserIds = events.data
        .map((event) => event.userId)
        .filter((userId) => userId && !userIds.includes(userId)) as string[];

    const users = newEventUserIds.length > 0
        ? await userApi.getByIds(newEventUserIds)
        : [];

    return {
        events,
        users
    }
};
