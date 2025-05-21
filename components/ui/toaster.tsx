"use client";

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { CircleAlert, PartyPopper } from "lucide-react";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({
                id,
                title,
                description,
                action,
                ...props
            }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title ? (
                                <ToastTitle>{title}</ToastTitle>
                            ) : props.variant === "success" ? (
                                <ToastTitle>
                                    <div className="flex items-center gap-2">
                                        <PartyPopper className="size-4" />
                                        Success!
                                    </div>
                                </ToastTitle>
                            ) : props.variant === "destructive" ? (
                                <ToastTitle className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <CircleAlert className="size-4" />
                                        Error!
                                    </div>
                                </ToastTitle>
                            ) : null}
                            {description && (
                                <ToastDescription>
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
