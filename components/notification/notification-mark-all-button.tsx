"use client";

import { markNotificationsAction } from "@/actions/notification/mark-notifications";
import { useToast } from "@/hooks/use-toast";
import { createFormToast } from "@/lib/utils";
import { MailOpen } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { Button } from "../ui/button";

type NotificationMarkAllButtonProps = {
    unreadCount: number;
    redirectUrl?: string;
};

const NotificationMarkAllButton = ({
    unreadCount, // The number of unread notifications to determine if the button should be enabled or disabled
    redirectUrl = "/dashboard/notifications", // The url the user is redirected to after marking all notifications as read
}: NotificationMarkAllButtonProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        markNotificationsAction,
        {}
    );

    const handleSubmit = () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("redirectUrl", redirectUrl);
            formAction(formData);
        });
    };

    useEffect(() => {
        createFormToast(toast, formState, "All notifications marked as read");
    }, [formState]);

    return (
        <Button
            variant="outline"
            loading={isLoading}
            disabled={unreadCount === 0}
            icon={<MailOpen />}
            onClick={handleSubmit}
        >
            Mark all as read
        </Button>
    );
};

export default NotificationMarkAllButton;
