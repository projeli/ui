import { cn } from "@/lib/utils";

type PageContainerProps = {
    children: React.ReactNode;
    size?: "default" | "full";
    className?: string;
};

const PageContainer = ({
    children,
    size,
    className,
    ...props
}: PageContainerProps) => {
    const sizeClasses = {
        default: "max-w-7xl",
        full: "max-w-full",
    };

    return (
        <div
            className={cn(
                "mx-auto px-4",
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
