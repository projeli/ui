import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center">
            <Loader2 className="animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
