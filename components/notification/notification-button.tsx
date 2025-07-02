import { notificationApi } from "@/lib/api/notification/notification-api";
import { Bell } from "lucide-react";
import Anchor from "../navigation/anchor";

const NotificationButton = async () => {
    const response = await notificationApi.getUnread();
    const unreadCount = response?.data ?? 0;

    return (
        <Anchor
            variant="ghost"
            size="icon"
            className="relative"
            href="/dashboard/notifications"
        >
            <Bell className="h-5! w-5!" />
            <span className="sr-only">Show Notifications</span>
            {unreadCount > 0 && (
                <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ring-2 ring-background" />
            )}
        </Anchor>
    );
};

export default NotificationButton;
