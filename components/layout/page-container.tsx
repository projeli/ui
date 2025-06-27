import { cn } from "@/lib/utils";

type PageContainerProps = {
    children: React.ReactNode;
    size?: "small" | "medium" | "large" | "default" | "full";
    className?: string;
};

const PageContainer = ({
    children,
    size,
    className,
    ...props
}: PageContainerProps) => {
    const sizeClasses = {
        small: "max-w-3xl",
        medium: "max-w-5xl",
        large: "max-w-6xl",
        default: "max-w-7xl",
        full: "max-w-full",
    };

    return (
        <div
            className={cn(
                "w-full mx-auto px-4",
                sizeClasses[size || "default"],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default PageContainer;
