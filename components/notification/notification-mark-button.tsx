"use client";

import { markNotificationAction } from "@/actions/notification/mark-notification";
import { useToast } from "@/hooks/use-toast";
import { Notification } from "@/lib/types/notification-types";
import { createFormToast } from "@/lib/utils";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

type NotificationMarkButtonProps = {
    notification: Notification;
    setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
};

const NotificationMarkButton = ({
    notification,
    setUnreadCount,
}: NotificationMarkButtonProps) => {
    const { toast } = useToast();
    const [isRead, setIsRead] = useState(notification.isRead);
    const [formState, formAction, isLoading] = useActionState(
        markNotificationAction,
        {
            data: isRead,
            success: false,
            message: "initial",
        }
    );

    useEffect(() => {
        if (formState.message === "initial") return;
        if (!formState.success) {
            createFormToast(toast, {
                success: false,
                message: formState.data
                    ? "Failed to mark notification as unread"
                    : "Failed to mark notification as read",
            });
            setIsRead(!formState.data ? false : true);
            setUnreadCount((prev) => (formState.data ? prev + 1 : prev - 1));
        }
    }, [formState]);

    const handleClick = async () => {
        if (isLoading) return;
        startTransition(() => {
            const formData = new FormData();
            formData.append("id", notification.id);
            formData.append("markAsRead", String(!isRead));
            formAction(formData);
        });
        setUnreadCount((prev) => (isRead ? prev + 1 : prev - 1));
        setIsRead((prev) => !prev);
    };

    return (
        <div className="size-6">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            className="size-6 p-0 rounded"
                            onClick={handleClick}
                        >
                            {!isRead && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isRead ? "Mark as unread" : "Mark as read"}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default NotificationMarkButton;
