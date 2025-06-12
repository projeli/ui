"use server";

import { notificationApi } from "@/lib/api/notification/notification-api";
import { ApiResponse } from "@/lib/types/api-response-types";
import { CustomServerAction } from "@/lib/types/form-types";

export const markNotificationAction: CustomServerAction<ApiResponse<boolean>> = async (
    currentState: ApiResponse<boolean>,
    formData: FormData
) => {
    const id = formData.get("id") as string;
    const markAsRead = formData.get("markAsRead") as string === "true";

    const response = await notificationApi.mark(id, markAsRead);

    if (response.success) {
        return {
            data: markAsRead,
            success: true,
            message: markAsRead
                ? "Notification marked as read"
                : "Notification marked as unread",
        }
    }

    return {
        data: !markAsRead,
        success: false,
        message: markAsRead
            ? "Failed to mark notification as unread"
            : "Failed to mark notification as read",
    };
};
