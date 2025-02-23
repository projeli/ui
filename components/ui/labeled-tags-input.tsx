"use client";

import { Errors } from "@/lib/types/form-types";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { TagsInput } from "./tags-input";

type LabeledTagsInputProps = React.ComponentProps<typeof TagsInput> & {
    label: string;
    required?: boolean;
    errors?: Errors;
};

const LabeledTagsInput = ({
    label,
    errors,
    name,
    required,
    className,
    ...props
}: LabeledTagsInputProps) => {
    return (
        <div
            className={cn(
                "grid w-full gap-1.5",
                errors && name && errors[name]
                    ? "grid-rows-[min-content,1fr,auto]"
                    : "grid-rows-[min-content,1fr]",
                className
            )}
        >
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive">*</span>}
            </Label>
            <TagsInput name={name} {...props} />
            {errors && name && errors[name] && (
                <p className="text-sm text-destructive">{errors[name]}</p>
            )}
        </div>
    );
};

export default LabeledTagsInput;
