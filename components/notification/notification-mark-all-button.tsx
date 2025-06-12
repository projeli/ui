"use client";

import { markNotificationsAction } from "@/actions/notification/mark-notifications";
import { useToast } from "@/hooks/use-toast";
import { createFormToast } from "@/lib/utils";
import { MailOpen } from "lucide-react";
import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";

type NotificationMarkAllButtonProps = {
    unreadCount: number;
};

const NotificationMarkAllButton = ({
    unreadCount,
}: NotificationMarkAllButtonProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        markNotificationsAction,
        {}
    );

    useEffect(() => {
        createFormToast(toast, formState, "All notifications marked as read");
    }, [formState]);

    return (
        <form action={formAction} className="flex items-center">
            <Button
                variant="outline"
                loading={isLoading}
                disabled={unreadCount === 0}
                icon={<MailOpen />}
            >
                Mark all as read
            </Button>
        </form>
    );
};

export default NotificationMarkAllButton;
