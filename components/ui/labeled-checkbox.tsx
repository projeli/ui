"use client";

import { Errors } from "@/lib/types/form-types";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

type LabeledCheckboxProps = React.ComponentProps<typeof Checkbox> & {
    label: string | React.ReactNode;
    errors?: Errors;
};

const LabeledCheckbox = ({
    label,
    errors,
    name,
    required,
    className,
    ...props
}: LabeledCheckboxProps) => {
    return (
        <div
            className={cn(
                "flex items-center space-x-2",
                errors && name && errors[name]
                    ? "grid-rows-[min-content,1fr,auto]"
                    : "grid-rows-[min-content,1fr]",
                className
            )}
        >
            <Checkbox
                className="size-5 rounded-[.5rem]"
                name={name}
                required={required}
                {...props}
            />
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive">*</span>}
            </Label>
            {errors && name && errors[name] && (
                <p className="text-sm text-destructive">{errors[name]}</p>
            )}
        </div>
    );
};

export default LabeledCheckbox;
