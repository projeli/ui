import { Errors } from "@/lib/types/form-types";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

type LabeledInputProps = React.ComponentProps<typeof Input> & {
    label: string;
    errors?: Errors;
};

const LabeledInput = ({
    label,
    errors,
    name,
    required,
    className,
    ...props
}: LabeledInputProps) => {
    return (
        <div
            className={cn(
                "grid w-full gap-1.5",
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
            <Input name={name} required={required} {...props} />
            {errors && name && errors[name] && (
                <p className="text-sm text-destructive">{errors[name]}</p>
            )}
        </div>
    );
};

export default LabeledInput;
