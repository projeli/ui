"use server";

import { notificationApi } from "@/lib/api/notification/notification-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const markNotificationsAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await notificationApi.markAllAsRead();

    if (response.success) {
        throw redirect(formData.get("redirectUrl") as string || "/dashboard/notifications");
    }

    return {
        data: !false,
        success: false,
        message: "Failed to mark all notification as read",
    };
};
