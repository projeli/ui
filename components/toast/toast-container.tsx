import React from "react";
import { twJoin } from "tailwind-merge";

interface ToastProps {
    id: number;
    message: string;
    type: "info" | "success" | "warning" | "error";
}

interface ToastContainerProps {
    toasts: ToastProps[];
    removeToast: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
    toasts,
    removeToast,
}) => {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="grid gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={twJoin(
                            "alert text-white text-lg",
                            `alert-${toast.type}`
                        )}
                        onClick={() => removeToast(toast.id)}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
            {/* To make sure all the classes are available */}
            <div className="hidden alert-error alert-info alert-success alert-warning"></div>
        </div>
    );
};

export default ToastContainer;