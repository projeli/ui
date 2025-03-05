import { FormState } from "@/lib/types/form-types";
import { OctagonAlert, PartyPopper, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type FormAlertProps = {
    formState: FormState;
    className?: string;
};

const FormAlert = ({ formState, className }: FormAlertProps) => {
    const [isVisible, setIsVisible] = useState(true);

    // Reset visibility when formState changes
    useEffect(() => {
        setIsVisible(true);
    }, [formState]);

    if (!isVisible || !formState.message) return null;

    return formState.success ? (
        <Alert variant="success" className={className}>
            <div className="flex items-start w-full">
                <div className="flex items-start flex-1">
                    <PartyPopper className="size-5 mr-2" />
                    <div>
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>{formState.message}</AlertDescription>
                    </div>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close alert"
                >
                    <X className="size-5" />
                </button>
            </div>
        </Alert>
    ) : (
        <Alert variant="destructive" className={className}>
            <div className="flex items-start w-full">
                <div className="flex items-start flex-1">
                    <OctagonAlert className="size-5 mr-2" />
                    <div>
                        <AlertTitle>Something went wrong!</AlertTitle>
                        <AlertDescription>
                            {formState.message || "An error occurred."}
                        </AlertDescription>
                    </div>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close alert"
                >
                    <X className="size-5" />
                </button>
            </div>
        </Alert>
    );
};

export default FormAlert;
