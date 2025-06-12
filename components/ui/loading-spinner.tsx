import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
    className
}: {
    className?: string;
}) => {
    return (
        <div className={cn("flex justify-center", className)}>
            <Loader2 className="animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
