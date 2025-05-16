"use client";

import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";
import ToastContainer from "./toast-container";

type ToastType = "info" | "success" | "warning" | "error";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    addToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback(
        (
            message: string,
            type: ToastType = "info",
            duration: number = 3000
        ) => {
            const id = Date.now(); // Generate unique ID
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => removeToast(id), duration);
        },
        [removeToast]
    );

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};