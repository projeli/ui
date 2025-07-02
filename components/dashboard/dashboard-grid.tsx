import { cn } from "@/lib/utils";

type DashboardGridProps = {
    children: React.ReactNode;
    reverse?: boolean;
    className?: string;
};

const DashboardGrid = ({
    children,
    reverse,
    className,
}: DashboardGridProps) => (
    <div
        className={cn(
            "grid grid-cols-1  gap-6",
            reverse
                ? "lg:grid-cols-[minmax(0,1fr)_18rem]"
                : "lg:grid-cols-[18rem_minmax(0,1fr)]",
            className
        )}
    >
        {children}
    </div>
);

export default DashboardGrid;
