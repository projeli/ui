"use server";

import { notificationApi } from "@/lib/api/notification/notification-api";
import { ApiResponse } from "@/lib/types/api-response-types";
import { CustomServerAction } from "@/lib/types/form-types";
import { Notification } from "@/lib/types/notification-types";

export const getNotifications: CustomServerAction<ApiResponse<Notification[]>> = async (
    currentState: ApiResponse<Notification[]>,
    formData: FormData
) => {
    const response = await notificationApi.get({
        unread: formData.get("unread") as string === "true" ? "true" : "false",
        pageSize: formData.get("pageSize") as string || "5",
        page: formData.get("page") as string || "1",
    });

    if (response.success) {
        const notifications = response.data || [];
        return {
            data: notifications,
            success: true,
            message: "Successfully fetched unread notifications",
        };
    }

    return {
        data: [],
        success: false,
        message: "Failed to fetch unread notifications",
    };
};
