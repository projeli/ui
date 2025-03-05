import { ControlGroup, ControlGroupItem } from "@/components/ui/control-group";
import {
    InputBase,
    InputBaseAdornment,
    InputBaseControl,
    InputBaseInput,
} from "@/components/ui/input-base";
import { Errors } from "@/lib/types/form-types";
import { cn } from "@/lib/utils";
import { Label } from "./label";

type LabeledPrefixedInputProps = React.ComponentProps<typeof InputBaseInput> & {
    prefix: string;
    label: string;
    errors?: Errors;
};

export function LabeledPrefixedInput({
    prefix,
    label,
    errors,
    name,
    required,
    className,
    ...props
}: LabeledPrefixedInputProps) {
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
            <ControlGroup className="!grow !w-full">
                <ControlGroupItem>
                    <InputBase>
                        <InputBaseAdornment>{prefix}</InputBaseAdornment>
                    </InputBase>
                </ControlGroupItem>
                <ControlGroupItem className="grow bg-background">
                    <InputBase>
                        <InputBaseControl>
                            <InputBaseInput
                                name={name}
                                required={required}
                                {...props}
                            />
                        </InputBaseControl>
                    </InputBase>
                </ControlGroupItem>
            </ControlGroup>
            {errors && name && errors[name] && (
                <p className="text-sm text-destructive">{errors[name]}</p>
            )}
        </div>
    );
}
