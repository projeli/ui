import { Errors } from "@/lib/types/form-types";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Textarea } from "./textarea";

type LabeledTextareaProps = React.ComponentProps<typeof Textarea> & {
    label: string;
    errors?: Errors;
};

const LabeledTextarea = ({
    label,
    errors,
    name,
    required,
    className,
    ...props
}: LabeledTextareaProps) => {
    return (
        <div
            className={cn(
                "grid w-full items-center gap-1.5",
                errors && name && errors[name]
                    ? "grid-rows-[min-content_1fr_auto]"
                    : "grid-rows-[min-content_1fr]",
                className
            )}
        >
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive">*</span>}
            </Label>
            <Textarea name={name} required={required} {...props} />
            {errors && name && errors[name] && (
                <p className="text-sm text-destructive">{errors[name]}</p>
            )}
        </div>
    );
};

export default LabeledTextarea;
