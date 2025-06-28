import { ApiResponse, PagedApiResponse } from "@/lib/types/api-response-types";
import { Notification } from "@/lib/types/notification-types";
import { cache } from "react";
import { BaseApi } from "../base-api";

export class NotificationApi extends BaseApi {
    
    constructor() {
        super("notifications");
    }

    async get(searchParams: {
        type?: string;
        unread?: string;
        page?: string;
        pageSize?: string;
    }): Promise<PagedApiResponse<Notification>> {
        return this.fetchService(
            this.createPathWithQueryParams("/v1/notifications", searchParams)
        ).then((res) => res.json());
    }

    getUnread = cache(async (): Promise<ApiResponse<number>> => {
        return this.fetchService("/v1/notifications/unread")
            .then((res) => res.json())
    })

    async mark(id: string, markAsRead: boolean): Promise<ApiResponse<boolean>> {
        return this.fetchService(
            `/v1/notifications/${id}/mark`,
            { method: "PUT", body: JSON.stringify({ isRead: markAsRead }) }
        ).then((res) => res.json());
    }

    async markAllAsRead(): Promise<ApiResponse<boolean>> {
        return this.fetchService(
            `/v1/notifications/read`,
            { method: "POST" }
        ).then((res) => res.json());
    }
}

export const notificationApi = new NotificationApi();
